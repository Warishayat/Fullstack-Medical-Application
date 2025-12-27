from pydantic import BaseModel,Field

class ChatValidate(BaseModel):
    question:str=Field(description="There must be some message.Message should not be empty")