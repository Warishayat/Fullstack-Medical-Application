from pydantic import BaseModel,Field,EmailStr
from typing_extensions import List,Literal,Dict



class message_val(BaseModel):
    name:str=Field(description="A name field where user will enter their name.")
    email:EmailStr=Field(description="An email field which will be required.")
    discussion_topic:str=Field("User will pass the discussion topic so admin get to know what is user want?")
    message:str=Field(description="A messgae field which cannot be null.")

    
