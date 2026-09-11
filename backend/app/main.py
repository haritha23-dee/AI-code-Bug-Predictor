from fastapi import FastAPI, Depends
from dependencies.auth import get_current_user
from dependencies.supabase_client import get_user_supabase

app = FastAPI()

@app.get("/me")
def me(user=Depends(get_current_user),
       db=Depends(get_user_supabase)):
    profile = db.table("profiles").select("*").eq("id", user["id"]).single().execute()
    return profile.data