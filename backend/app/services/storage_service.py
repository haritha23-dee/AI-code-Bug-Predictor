def upload_avatar(db, user_id: str, filename: str, raw_bytes: bytes, content_type: str) -> str:
    """Uploads an avatar to Supabase Storage and returns its public URL."""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "png"
    storage_path = f"{user_id}/avatar.{ext}"

    db.storage.from_("avatars").upload(
        storage_path,
        raw_bytes,
        {"content-type": content_type, "upsert": "true"},
    )
    return db.storage.from_("avatars").get_public_url(storage_path)