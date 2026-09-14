from pydantic import BaseModel, ConfigDict, model_validator
from typing import Optional, Literal

CodeLanguage = Literal["html", "css", "r", "python", "c", "cpp", "java", "javascript", "reactjs"]

class FilePasteCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    project_id: str
    language: CodeLanguage
    file_name: str
    original_code: str

    @model_validator(mode="after")
    def check_code_not_empty(self):
        if not self.original_code.strip():
            raise ValueError("original_code cannot be empty")
        return self