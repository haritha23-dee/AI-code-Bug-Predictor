from fastapi import APIRouter, Depends
from dependencies.roles import require_admin
from dependencies.supabase_client import get_user_supabase

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/overview")
def platform_overview(user=Depends(require_admin), db=Depends(get_user_supabase)):
    result = db.rpc("admin_get_platform_overview", {}).execute()
    return result.data[0] if result.data else {}

#users breakdown endpoint
@router.get("/users")
def user_breakdown(user=Depends(require_admin), db=Depends(get_user_supabase)):
    result = db.rpc("admin_get_user_breakdown", {}).execute()
    return result.data or []