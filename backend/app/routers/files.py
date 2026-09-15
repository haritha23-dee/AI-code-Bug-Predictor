from fastapi import APIRouter, Depends, HTTPException
from dependencies.roles import require_user
from dependencies.supabase_client import get_user_supabase
from app.schemas.file import FilePasteCreate
from fastapi import UploadFile, File, Form
from app.schemas.file import EXTENSION_MAP
from uuid import UUID

router = APIRouter(prefix="/files", tags = ["files"])

@router.post("/upload", status_code=201)
def upload_file(
    project_id: UUID = Form(...),
    file: UploadFile = File(...),
    user=Depends(require_user),
    db=Depends(get_user_supabase),
):
    project = db.table("projects").select("id").eq("id", str(project_id)).execute()
    if not project.data:
        raise HTTPException(404, "Project not found")

    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    language = EXTENSION_MAP.get(ext)
    if not language:
        raise HTTPException(422, f"Unsupported file extension: .{ext}")

    raw_bytes = file.file.read()
    if len(raw_bytes) > 5 * 1024 * 1024:
        raise HTTPException(413, "File too large (max 5MB)")

    try:
        code_text = raw_bytes.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(422, "File is not valid UTF-8 text")

    storage_path = f"{user['id']}/{project_id}/{file.filename}"
    db.storage.from_("source-code").upload(storage_path, raw_bytes, {"content-type": "text/plain"})

    result = db.table("project_files").insert({
        "project_id": str(project_id),
        "user_id": user["id"],
        "language": language,
        "file_name": file.filename,
        "original_code": code_text,
        "storage_path": storage_path
    }).execute()
    return result.data[0]

@router.post("", status_code=201, tags=["files"])
def create_pasted_file(payload: FilePasteCreate, user=Depends(require_user), db=Depends(get_user_supabase)):
    project = db.table("projects").select("id").eq("id", str(payload.project_id)).execute()
    if not project.data:
        raise HTTPException(404, "Project not found")

    result = db.table("project_files").insert({
        "project_id": str(payload.project_id),
        "user_id": user["id"],
        "language": payload.language,
        "file_name": payload.file_name,
        "original_code": payload.original_code,
    }).execute()
    return result.data[0]

@router.get("/{file_id}")
def get_file(file_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").select("*").eq("id", str(file_id)).execute()
    if not result.data:
        raise HTTPException(404, "File not Found")
    return result.data[0]

@router.get("/project/{project_id}")
def list_files_for_project(project_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").select("*").eq("project_id", str(project_id)).order("created_at", desc=True).execute()
    return result.data

@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: UUID, user=Depends(require_user), db=Depends(get_user_supabase)):
    result = db.table("project_files").delete().eq("id", str(file_id)).execute()
    if not result.data:
        raise HTTPException(404, "Project not found")
    return None
