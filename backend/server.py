import os
import re
import logging
from pathlib import Path
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic_settings import BaseSettings



# ── APP + ENDPOINTS ────────────────────────────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1) Recursos estáticos: logos, imágenes, etc.
app.mount("/static", StaticFiles(directory="../static"), name="static")

# 2) Servir imagen en la raíz (segunda página limpia)
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")
