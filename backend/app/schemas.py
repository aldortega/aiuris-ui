from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)

class UserPublic(BaseModel):
    id: int
    email: EmailStr

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class LoginInput(BaseModel):
    email: EmailStr
    password: str

class RefreshInput(BaseModel):
    token: str
