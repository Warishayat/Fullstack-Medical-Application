from pydantic import BaseModel,EmailStr,Field


class registerValidation(BaseModel):
    name:str=Field(description="User will pass name from frontend")
    email:EmailStr=Field(description="User will proper email formate")
    password:str=Field(description="User will proper passwprd formate")
    

class LoginValidation(BaseModel):
    email:EmailStr=Field(description="User will proper email formate")
    password:str=Field(description="User will proper passwprd formate")
    

class RegistrationResponse(BaseModel):
    name:str=Field(description="User name will shown in response")
    email:EmailStr=Field(description="email will shown if user got created.")
    

class LoginResponse(BaseModel):
    token:str=Field(description="If user got login only token will show on the screen.")
    