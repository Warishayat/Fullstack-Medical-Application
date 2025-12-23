from pinecone import Pinecone
from pinecone import ServerlessSpec
from langchain_pinecone import PineconeVectorStore
import os
from dotenv import load_dotenv


load_dotenv()


PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")


pc = Pinecone(api_key=PINECONE_API_KEY)


index_name = "medical-chatbot"
indexes = [i['names'] for i in pc.list_indexes()]

if index_name not in indexes:
    pc.create_index(
        index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    print("Index has been created Successfully")

index = pc.Index(index_name)



