from pydantic import BaseModel,EmailStr,Field


class registerValidation(BaseModel):
    name:str=Field(description="User will pass name from frontend")
    email:EmailStr=Field(description="User will proper email formate")
    password:str=Field(description="User will proper passwprd formate")
    

class LoginValidation(BaseModel):
    email:EmailStr=Field(description="User will proper email formate")
    password:str=Field(description="User will proper passwprd formate")
    

class RegistrationResponse(BaseModel):
    name:str=Field(description="User will pass name from frontend")
    email:EmailStr=Field(description="User will proper email formate")
    

class LoginResponse(BaseModel):
    token:str
    