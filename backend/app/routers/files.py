from fastapi import APIRouter, Depends, HTTPException
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.schemas.file import FilePasteCreate

router = APIRouter(prefix="/files", tags = ["files"])

@router.post("", status_code=201, tags=["files"])
def create_pasted_file(payload: FilePasteCreate, user=Depends(require_user), db=Depends(get_user_supabase)):
    project = db.table("projects").select("id").eq("id", payload.project_id).execute()
    if not project.data:
        raise HTTPException(404, "Project not found")

    result = db.table("project_files").insert({
        "project_id": payload.project_id,
        "user_id": user["id"],
        "language": payload.language,
        "file_name": payload.file_name,
        "original_code": payload.original_code,
    }).execute()
    return result.data[0]

@router.get("/{file_id}")
def get_file(file_id: str, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").select("*").eq("id", file_id).execute()
    if not result.data:
        raise HTTPException(404, "File not Found")
    return result.data[0]

@router.get("/project/{project_id}")
def list_files_for_project(project_id: str, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").select("*").eq("project_id", project_id).order("created_at", desc=True).execute()
    return result.data

@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: str, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").delete().eq("id", file_id).execute()
    if not result.data:
        raise HTTPException(404, "Project not found")
    return None
