from fastapi import HTTPException, Header
from supabase import create_client
from jose import jwt, JWTError
from app.config import settings

def get_current_user(authorization: str = Header(...)) -> dict:
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or malformed authorization header")
    token = authorization.removeprefix("Bearer ")

    client = create_client(settings.supabase_url, settings.supabase_anon_key)

    try:
        user_response = client.auth.get_user(token)
    except Exception as e:
        raise HTTPException(401, "Invalid or expired token")

    return {"id": user_response.user.id, "token": token}
