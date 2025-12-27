from fastapi import APIRouter,HTTPException,status
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
index_name="medical-chatbot"
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
embeddings = download_embeddings_models()

doc_search = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embeddings=embeddings
)
retrirver=doc_search.as_retriever(search_type="similarity", search_kwargs={"k":3})

router = APIRouter(
    prefix="/medical",
    tags=["Chat with medical Chatbot"]
)


def format_docs(docs: list[Document]) -> str:
    return "\n\n".join(doc.page_content for doc in docs)

prompt = ChatPromptTemplate.from_template(
"""
You are a helpful medical assistant.
Answer the question ONLY using the context below.
If the answer is not in the context, say "I don't know".

Context:
{context}

Question:
{question}
"""
)

chain = (
    {
        "context": retrirver | format_docs,
        "question": RunnablePassthrough()
    }
    | prompt
    | model
    | StrOutputParser()
)

@router.post("/chat")
async def Chat(data:ChatValidate):
    try:
        response=chain.invoke(data.question)
        if not response:
            raise HTTPException(
                status_code=404,
                detail="There is some error try it later"
            )
        return{
            status:201,
            "response" : response
        }
    except:
        return{
            status:501,
            "message":"Internel Server Error"
        }





