from fastapi import APIRouter, Depends, HTTPException
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.services.groq_service import analyze_code
from app.schemas.analysis import AnalysisResultResponse
import json
from uuid import UUID
import logging

logger = logging.getLogger("brainy")

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
        logger.error(f"AI analysis failed for file {file_id}: {e}")
        raise HTTPException(502, f"AI analysis failed: {e}")

    insert_payload = {
        "file_id": str(file_id),
        "project_id": file_data["project_id"],
        "user_id": user["id"],
        "bug_severity": result_json.get("bug_severity") if result_json.get("bug_severity") in ["low", "medium", "high", "critical"] else None,
        #bug fix for ENUM in bug_severity, default to None(NULL)
        "bug_type": result_json.get("bug_type"),
        "bug_score": result_json.get("bug_score"),
        "complexity_score": result_json.get("complexity_score"),
        "quality_score": result_json.get("quality_score"),
        "flagged_lines": result_json.get("flagged_lines"),
        "suggested_fix_text": result_json.get("suggested_fix_text"),
        "suggested_code_text": result_json.get("suggested_code") or result_json.get("suggested_code"),
    }

    insert = db.table("analysis_results").insert(insert_payload).execute()
    return insert.data[0]

@router.get("/{file_id}/analysis/latest")
def get_latest_analysis(file_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = (
        db.table("analysis_results")
        .select("*")
        .eq("file_id", str(file_id))
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise HTTPException(404, "No analysis found for this file")
    return result.data[0]

#full history
@router.get("/{file_id}/analysis/history")
def get_analysis_history(file_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = (
        db.table("analysis_results")
        .select("*")
        .eq("file_id", str(file_id))
        .order("created_at", desc=True)
        .execute()
    )

#full analysis history
@router.get("/all/history")
def get_all_user_history(user=Depends(require_user), db=Depends(get_user_supabase)):
    result = (
        db.table("analysis_results")
        .select("*, project_files(file_name), projects(name)")
        .eq("user_id", user["id"])
        .order("created_at", desc=True)
        .execute()
    )
    
    formatted_data = []
    for row in result.data:
        file_name = row.get("project_files", {}).get("file_name", "Unknown File") if row.get("project_files") else "Unknown File"
        project_name = row.get("projects", {}).get("name", "Unknown Project") if row.get("projects") else "Unknown Project"
        
        row["file_name"] = file_name
        row["project_name"] = project_name
        formatted_data.append(row)
        
    return formatted_data