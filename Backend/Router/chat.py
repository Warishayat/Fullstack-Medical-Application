from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from validation.chat_validation import ChatValidate
from utils.database import client
from langchain_core.messages import HumanMessage
from Helper.chain01 import workflow
from Helper.chain01 import app 

import os
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        user_response = client.auth.get_user(token)
        if user_response.user is None:
            raise Exception()
        return user_response.user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

router = APIRouter(
    prefix="/medical",
    tags=["Medical Chat"]
)


@router.post("/chat")
async def chat(
    data: ChatValidate,
    user = Depends(get_current_user)
):
    try:
        config = {"configurable": {"thread_id": user.id}}
        input_state = {"messages": [HumanMessage(content=data.question)]}
        result = await app.ainvoke(input_state, config=config)
        final_response = result["messages"][-1].content

        return {
            "status": 200,
            "user_id": user.id,
            "email": user.email,
            "response": final_response
        }

    except Exception as e:
        print("Chat Error:", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )