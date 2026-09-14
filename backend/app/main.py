from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies.auth import get_current_user
from dependencies.supabase_client import get_user_supabase
from app.routers import admin, auth as auth_router, projects, files, analysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router.router)
app.include_router(admin.router)
app.include_router(projects.router)
app.include_router(files.router)
app.include_router(analysis.router)

@app.get("/me")
def me(user=Depends(get_current_user), db=Depends(get_user_supabase)):
    profile = db.table("profiles").select("*").eq("id", user["id"]).single().execute()
    return profile.data
