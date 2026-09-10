from supabase import create_client, Client
from fastapi import Depends
from app.config import settings
from dependencies.auth import get_current_user

def get_supabase_client(user: dict = Depends(get_current_user)) -> Client:
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    client.postgrest.auth(user["token"])
    return client