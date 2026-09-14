from fastapi import APIRouter, Depends, HTTPException
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.services.groq_service import analyze_code
from app.schemas.analysis import AnalysisResultResponse
import json
from uuid import UUID

router = APIRouter(prefix="/files", tags=["analysis"])

@router.post("/{file_id}/analyze", status_code=201, response_model=AnalysisResultResponse)
def trigger_analysis(file_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    file_row = db.table("project_files").select("*").eq("id", file_id).execute()
    if not file_row.data:
        raise HTTPException(404, "File not found")
    file_data = file_row.data[0]

    try:
        result_json = json.loads(analyze_code(file_data["original_code"], file_data["language"]))
    except Exception as e:
        raise HTTPException(502, f"AI analysis failed: {e}")

    insert_payload = {
        "file_id": file_id,
        "project_id": file_data["project_id"],
        "user_id": user["id"],
        "bug_severity": result_json.get("bug_severity"),
        "bug_type": result_json.get("bug_type"),
        "bug_score": result_json.get("bug_score"),
        "complexity_score": result_json.get("complexity_score"),
        "quality_score": result_json.get("quality_score"),
        "flagged_lines": result_json.get("flagged_lines"),
        "suggested_fix_text": result_json.get("suggested_fix_text"),
        "suggested_code_text": result_json.get("suggested_code"),
    }

    insert = db.table("analysis_results").insert(insert_payload).execute()
    return insert.data[0]