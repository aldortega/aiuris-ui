from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import User
from .schemas import UserCreate, UserPublic, TokenPair, LoginInput, RefreshInput
from .auth import hash_password, verify_password, create_access_refresh, get_current_user, refresh_from_refresh

app = FastAPI(title="Auth API (FastAPI + JWT)")
Base.metadata.create_all(bind=engine)

# Ajusta el origin al de tu Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/auth/register", response_model=UserPublic, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = User(email=data.email, password_hash=hash_password(data.password))
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email ya registrado")
    return UserPublic(id=user.id, email=user.email)

@app.post("/auth/login", response_model=TokenPair)
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    access, refresh = create_access_refresh(user.id)
    return TokenPair(access_token=access, refresh_token=refresh)

@app.post("/auth/refresh", response_model=TokenPair)
def refresh(payload: RefreshInput, db: Session = Depends(get_db)):
    # `token` es el refresh token enviado en el body como form field o JSON string
    new_access = refresh_from_refresh(db, payload.token)
    # Reutilizamos el mismo refresh (simple) — en prod podrías rotarlo
    return TokenPair(access_token=new_access, refresh_token=payload.token)

@app.get("/me", response_model=UserPublic)
def me(user: User = Depends(get_current_user)):
    return UserPublic(id=user.id, email=user.email)
