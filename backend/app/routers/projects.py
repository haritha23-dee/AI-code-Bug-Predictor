from fastapi import APIRouter, Depends
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/")
def list_my_projects(user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("projects").select("*").execute()
    return result.data