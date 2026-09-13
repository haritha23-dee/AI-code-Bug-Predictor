from fastapi import HTTPException, Header, Depends, APIRouter
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

    client.postgrest.auth(token)
    try: 
        profile = client.table("profiles").select("role").eq("id", user_response.user.id).single().execute()
    except Exception as e:
        raise HTTPException(404, "Profile not found" )

    return {"id": user_response.user.id, "token":token, "role": profile.data["role"]}

def require_role(*allowed_roles: str):
    def checker(user: dict = Depends(get_current_user)) -> dict:
        if user["role"] not in allowed_roles:
            raise HTTPException(403, f"Require one of roles:{', '.join(allowed_roles)}")
        return user
    return checker
