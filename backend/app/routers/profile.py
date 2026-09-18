from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.services.storage_service import upload_avatar

router = APIRouter(prefix="/me", tags=["profile"])

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp"}

@router.post("/avatar")
def upload_profile_avatar(
    file: UploadFile = File(...),
    user=Depends(require_user),
    db=Depends(get_user_supabase),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(422, "Only PNG, JPEG, or WEBP images are allowed")

    raw_bytes = file.file.read()
    if len(raw_bytes) > 2 * 1024 * 1024:
        raise HTTPException(413, "Image too large (max 2MB)")

    try:
        public_url = upload_avatar(db, user["id"], file.filename, raw_bytes, file.content_type)
    except Exception as e:
        raise HTTPException(500, f"Avatar upload failed: {str(e)}")

    result = db.table("profiles").update({"avatar_url": public_url}).eq("id", user["id"]).execute()
    if not result.data:
        raise HTTPException(500, "Profile update failed after upload")

    return result.data[0]