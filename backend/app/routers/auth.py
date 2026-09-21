from fastapi import APIRouter, HTTPException
from supabase import create_client
from app.config import settings
from app.schemas.auth import SignupRequest, LoginRequest, RefreshRequest #refresh token access from auth schemas
import logging

logger = logging.getLogger("brainy")

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
def signup(payload: SignupRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.sign_up({
            "email": payload.email,
            "password" : payload.password,
            "options" : {"data": {"full_name": payload.full_name}} 
            if payload.full_name else {},
        })
    except Exception as e:
        logger.error(f"Signup failed for {payload.email}: {e}")
        raise HTTPException(400, f"signup failed:{str(e)}")

    #postgres public.profiles() upsertion of new profiles
    client.postgrest.auth(response.session.access_token)
    try:
        existing = client.table("profiles").select("id").eq("id", response.user.id).execute()
        if not existing.data:
            client.table("profiles").upsert({
                "id": response.user.id,
                "email": payload.email,
                "full_name": payload.full_name,
            }).execute()
    except Exception as e:
        logger.error(f"Profile upsert failed for {response.user.id}: {e}")
        raise HTTPException(500, "Account created but profile setup failed")
    
    return {"status": "signed_in", "access_token": response.session.access_token, "user_id": response.user.id}

@router.post("/login")
def login(payload: LoginRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.sign_in_with_password({"email": payload.email, "password": payload.password})

    except Exception as e:
        raise HTTPException(401, "Invalid credentials")

    return {"access_token": response.session.access_token, 
            "refresh_token": response.session.refresh_token,"user_id": response.user.id}

@router.post("/admin-login")
def admin_login(payload: LoginRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.sign_in_with_password({"email": payload.email, "password": payload.password})
    except Exception:
        raise HTTPException(401, "Invalid credentials")

    client.postgrest.auth(response.session.access_token)
    profile = client.table("profiles").select("role").eq("id", response.user.id).single().execute()

    if profile.data["role"] != "admin":
        raise HTTPException(403, "Not an admin account")

    return {"access_token": response.session.access_token, 
            "refresh_token": response.session.refresh_token,"user_id": response.user.id, "role": "admin"}

#endpoint for refresh token
@router.post("/refresh")
def refresh_token(payload: RefreshRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.refresh_session(payload.refresh_token)
    except Exception:
        raise HTTPException(401, "Session expired, please login again")

    return {
        "access_token": response.session.access_token,
        "refresh_token": response.session.refresh_token,
        "user_id": response.user.id,
    }