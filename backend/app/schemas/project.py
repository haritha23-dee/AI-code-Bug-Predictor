from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional
from uuid import UUID
from datetime import datetime

class ProjectCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None

    @field_validator("name")
    @classmethod
    def name_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("name cannot be blank or whitespace-only")
        return v

class ProjectResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str 
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
