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

    if response.session is None:
        return {"Status": "confirmation_required", "message": "check your mail to confirm your account before logging in."}
    
    return {"status": "signed_in", "access_token": response.session.access_token, "user_id": response.user.id}

@router.post("/login")
def login(payload: LoginRequest):
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        response = client.auth.sign_in_with_password({"email": payload.email, "password": payload.password})

    except Exception as e:
        raise HTTPException(401, "Invalid credentials")

    return {"access_token": response.session.access_token, "user_id": response.user.id}