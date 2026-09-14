from pydantic import BaseModel
from typing import Optional, Literal
from uuid import UUID
from datetime import datetime

Severity = Literal["low", "medium", "high", "critical", "none"]

class FlaggedLine(BaseModel):
    line: int
    message: str
    severity: Severity

class AnalysisResultResponse(BaseModel):
    id: UUID
    file_id: UUID
    project_id: UUID
    user_id: UUID
    bug_severity: Optional[Severity] = None
    bug_type: Optional[str] = None
    bug_score: Optional[float] = None
    complexity_score: Optional[float] = None
    quality_score: Optional[float] = None
    flagged_lines: Optional[list[FlaggedLine]] = None
    suggested_fix_text: Optional[str] = None
    suggested_code_text: Optional[str] = None
    created_at: datetime