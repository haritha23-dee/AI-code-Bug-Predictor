from fastapi import FastAPI, Depends
from dependencies.auth import get_current_user
from dependencies.supabase_client import get_user_supabase
from app.routers import admin, auth as auth_router

app = FastAPI()

app.include_router(auth_router.router)
app.include_router(admin.router)

@app.get("/me")
def me(user=Depends(get_current_user),
       db=Depends(get_user_supabase)):
    profile = db.table("profiles").select("*").eq("id", user["id"]).single().execute()
    return profile.data