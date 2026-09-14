from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, Header, Depends, APIRouter
from supabase import create_client
from jose import jwt, JWTError
from app.config import settings

bearer_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> dict:
    token = credentials.credentials

    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    try:
        user_response = client.auth.get_user(token)
    except Exception as e:
        raise HTTPException(401, f"Invalid or expired token: {str(e)}")

    client.postgrest.auth(token)
    try: 
        profile = client.table("profiles").select("role").eq("id", user_response.user.id).single().execute()
    except Exception as e:
        raise HTTPException(404, f"Profile not found: {str(e)}" )

    return {"id": user_response.user.id, "token":token, "role": profile.data["role"]}

def require_role(*allowed_roles: str):
    def checker(user: dict = Depends(get_current_user)) -> dict:
        if user["role"] not in allowed_roles:
            raise HTTPException(403, f"Require one of roles:{', '.join(allowed_roles)}")
        return user
    return checker
