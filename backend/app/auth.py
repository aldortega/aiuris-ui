from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.hash import bcrypt
from sqlalchemy.orm import Session

from .database import get_db
from .models import User

# === Config ===
JWT_SECRET = "CHANGE_ME__USE_ENV"       # ➜ en prod, leer de variables de entorno
JWT_ALG = "HS256"
ACCESS_MIN = 30                         # minutos
REFRESH_DAYS = 7

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hash_password(plain: str) -> str:
    return bcrypt.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.verify(plain, hashed)

def create_token(sub: str, minutes: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": sub,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=minutes)).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def create_access_refresh(user_id: int):
    access = create_token(str(user_id), ACCESS_MIN)
    refresh = create_token(f"refresh:{user_id}", REFRESH_DAYS * 60 * 24)
    return access, refresh

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    payload = decode_token(token)
    sub = payload.get("sub")
    if not sub:
        raise HTTPException(status_code=401, detail="Token sin subject")
    user_id = int(sub)
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return user

def refresh_from_refresh(db: Session, refresh_token: str) -> str:
    payload = decode_token(refresh_token)
    sub = payload.get("sub", "")
    if not sub.startswith("refresh:"):
        raise HTTPException(status_code=401, detail="No es un refresh token")
    user_id = int(sub.split("refresh:")[1])
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    access, _ = create_access_refresh(user.id)
    return access
