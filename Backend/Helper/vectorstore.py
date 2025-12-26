import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

from Helper.rag import (
    load_pdfs_from_directory,
    chunks_and_overlap,
    filtered_docs
)

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=PINECONE_API_KEY)

INDEX_NAME = "medical-chatbot"
DIMENSION = 384

existing_indexes = [i.name for i in pc.list_indexes()]

if INDEX_NAME not in existing_indexes:
    pc.create_index(
        name=INDEX_NAME,
        dimension=DIMENSION,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    print("Index created successfully")
else:
    print("Index already exists")

index = pc.Index(INDEX_NAME)

def download_embeddings_models():
    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

embedding_model = download_embeddings_models()

vectorstore = PineconeVectorStore(
    index=index,
    embedding=embedding_model
)

if __name__ == "__main__":

    DATA_PATH = r"C:\Users\HP\Desktop\Medical-Chatbot\Fullstack-Medical-Application\Backend\Data"

    print("Loading PDFs...")
    documents = load_pdfs_from_directory(DATA_PATH)

    print(f"Loaded {len(documents)} pages")

    print("Filtering the data..............")
    filter_docs = filtered_docs(docs=documents)
    print("Document has been filterd............")

    print("Splitting documents...")
    chunks = chunks_and_overlap(filter_docs)
    print(f"Created {len(chunks)} chunks")

    print("Uploading to Pinecone...")
    vectorstore.add_documents(chunks)
    print("Vectorstore ingestion completed")
