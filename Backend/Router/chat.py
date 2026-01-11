from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from validation.chat_validation import ChatValidate
from utils.database import client
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.documents import Document
from langchain_pinecone import PineconeVectorStore

from Helper.rag import load_model
from Helper.vectorstore import download_embeddings_models

import os
from dotenv import load_dotenv

load_dotenv()

model = load_model()
index_name = "medical-chatbot"

embeddings_model = download_embeddings_models()

doc_search = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings_model
)

retriever = doc_search.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

security = HTTPBearer()

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

def format_docs(docs: list[Document]) -> str:
    return "\n\n".join(doc.page_content for doc in docs)

prompt = ChatPromptTemplate.from_template(
"""
You are a specialized Medical AI Assistant. Your knowledge is strictly limited to the provided context.
Instructions:
Answer the question ONLY using the text provided in the context.
Do not use any outside knowledge or provide general medical advice.
If the specific answer is not found within the context, you must respond with exactly: 'There is no mentioned anything about this topic in book The GALE ENCYCLOPEDIA of MEDICINE'.
Keep the tone professional, concise, and clinically accurate

Context:
{context}

Question:
{question}
"""
)

chain = (
    {
        "context": retriever | format_docs,
        "question": RunnablePassthrough()
    }
    | prompt
    | model
    | StrOutputParser()
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
        response = await chain.ainvoke(data.question)

        return {
            "status": 200,
            "user_id": user.id,
            "email": user.email,
            "response": response
        }

    except Exception as e:
        print("Chat Error:", e)
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )
