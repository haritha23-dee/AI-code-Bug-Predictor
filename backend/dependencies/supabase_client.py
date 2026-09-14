from supabase import create_client, Client, ClientOptions
from fastapi import Depends
from app.config import settings
from dependencies.auth import get_current_user

def get_user_supabase(user: dict = Depends(get_current_user)) -> Client:
    client = create_client(settings.supabase_url, settings.supabase_anon_key,
                           options=ClientOptions(headers={"Authorization": f"Bearer {user['token']}"})
                            )
    client.postgrest.auth(user["token"])
    return client