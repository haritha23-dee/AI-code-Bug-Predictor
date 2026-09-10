from fastapi import FastAPI, Depends
from dependencies.auth import get_current_user
from dependencies.supabase_client import get_supabase_client

app = FastAPI()

@app.get("/me")
def me(user=Depends(get_current_user),
       db=Depends(get_supabase_client)):
    profile = db.table("profiles").select("*").select("*").eq("id", user["id"]).single().execute()
    if profile.error:
        return {"error": profile.error}
    return profile.data