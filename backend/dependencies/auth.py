from fastapi import HTTPException, Header
from jose import jwt, JWTError
from app.config import settings

def get_current_user(authorization: str = Header(...)) -> dict:
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or malformed authorization header")
    token = authorization.removeprefix("Bearer ")

    try:
        payload = jwt.decode(token, settings.supabase_jwt_secret, algorithms=["H256"], audience = "authenticated",)
    except JWTError:
        raise HTTPException(401, "Invalid or expired token")
    return {"id": payload["sub"], "token": token}
