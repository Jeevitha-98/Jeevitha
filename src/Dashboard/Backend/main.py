import os
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import models

from routes import authroutes, Supplier, Vendor, Admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Supplier & Vendor System API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8085",
        "http://127.0.0.1:8085"
    ],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
    expose_headers=["*"]
)

# --- 1. ENDPOINT ROUTER MAPS (Positioned above Static Mounts to prevent path capture) ---
app.include_router(authroutes.router, prefix="/auth")
app.include_router(Supplier.router)
app.include_router(Vendor.router)
app.include_router(Admin.router)

# --- 2. STATIC MEDIA STORAGE PATH CONFIG ---
os.makedirs("uploads/products", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def root():
    return {"status": "success", "message": "Backend platform running successfully"}
