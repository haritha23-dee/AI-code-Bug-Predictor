from fastapi import APIRouter, HTTPException
from supabase import create_client
from app.config import settings
from app.schemas.auth import SignupRequest, LoginRequest

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
        raise HTTPException(400, f"signup failed:{str(e)}")
    
    return {"status": "signed_in", "access_token": response.session.access_token, "user_id": response.user.id}

@router.post("/login")
def login(payload: LoginRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.sign_in_with_password({"email": payload.email, "password": payload.password})

    except Exception as e:
        raise HTTPException(401, "Invalid credentials")

    return {"access_token": response.session.access_token, "user_id": response.user.id}

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

    return {"access_token": response.session.access_token, "user_id": response.user.id, "role": "admin"}