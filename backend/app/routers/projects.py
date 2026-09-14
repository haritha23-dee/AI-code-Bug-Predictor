from fastapi import APIRouter, Depends, HTTPException
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.schemas.project import ProjectCreate

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("", status_code=201)
def create_project(payload: ProjectCreate, user=Depends(require_user), 
                   db = Depends(get_user_supabase)):
    result = db.table("projects").insert({
        "user_id": user["id"],
        "name": payload.name,
        "description": payload.description,
    }).execute()
    return result.data[0]

@router.get("")
def list_projects(user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("projects").select("*").order("created_at", desc = True).execute()
    return result.data

@router.get("/{project_id}")
def get_project(project_id: str, user=Depends(require_user), db = Depends(get_user_supabase)):
    result = db.table("projects").select("*").eq("id", project_id).execute()
    if not result.data:
        raise HTTPException(404, "Project not found")
    return result.data[0]

@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: str, user=Depends(require_user), db = Depends(get_user_supabase)):
    result = db.table("projects").delete().eq("id", project_id).execute()
    if not result.data:
        raise HTTPException(404, "Project not found")
    return None