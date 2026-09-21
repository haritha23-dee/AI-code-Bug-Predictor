from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from pydantic import field_validator

@field_validator("email", mode="before")
@classmethod
def normalize_email(cls, v):
    return v.strip().lower() if isinstance(v, str) else v

class SignupRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

#refresh request schema setup
class RefreshRequest(BaseModel):
    refresh_token: str
