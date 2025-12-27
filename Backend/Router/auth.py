from fastapi import FastAPI,HTTPException,status
from validation.auth_validator import registerValidation,LoginValidation,RegistrationResponse,LoginResponse
from utils.database import client
from fastapi import APIRouter

router = APIRouter(
    prefix="/user",
    tags=["Register/Login"]
)


@router.post("/register")
def RegisterUser(data: registerValidation):
    auth_response = client.auth.sign_up({
        "name":data.name,
        "email": data.email,
        "password": data.password
    })

    if auth_response.user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    user_id = auth_response.user.id
    client.table("Users").insert({
        "name":data.name,
        "email": data.email,
        "password": data.password
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
