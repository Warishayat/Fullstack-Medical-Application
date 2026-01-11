from fastapi import APIRouter, HTTPException, status,Depends
from Router.auth import get_current_user
from validation.message_validation import message_val
from utils.database import client

router = APIRouter(
    prefix="/chat",
    tags=["Chat with Admin"]
)

@router.post("/message_us", status_code=status.HTTP_201_CREATED)
def chatwithadmin(data: message_val,user = Depends(get_current_user)):
    name = data.name
    email = data.email
    discussion_topic = data.discussion_topic
    message = data.message

    if not all([name, email, discussion_topic, message]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="All fields must be filled."
        )

    client.table("messages").insert({
        "name": name,
        "email": email,
        "discussion_topic": discussion_topic,
        "message": message
    }).execute()

    return {
        "status": "success",
        "message": "Your message has been delivered successfully."
    }
