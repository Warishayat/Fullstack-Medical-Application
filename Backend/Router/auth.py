from fastapi import FastAPI,HTTPException,Depends,status
from validation.auth_validator import registerValidation,LoginValidation,RegistrationResponse,LoginResponse
from utils.database import client
from fastapi import APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(
    prefix="/user",
    tags=["Register/Login"]
)
security = HTTPBearer()

@router.post("/register")
def RegisterUser(data: registerValidation):
    try:
        auth_response = client.auth.sign_up({
            "email": data.email,
            "password": data.password,
            "options": {
                "data": {
                    "name": data.name
                }
            }
        })
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="User already registered"
        )

    user_id = auth_response.user.id  

    client.table("Users").insert({
        "id": user_id,  
        "name": data.name,
        "email": data.email
    }).execute()

    return {
        "message": "User registered successfully",
        "user_id": user_id
    }

@router.post("/login")
def LoginUser(data: LoginValidation):

    response = client.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })

    if response.session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {
        "access_token": response.session.access_token,
        "refresh_token": response.session.refresh_token
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        user_response = client.auth.get_user(token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    if user_response.user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized"
        )

    return user_response.user