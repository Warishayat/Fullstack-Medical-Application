from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_community.document_loaders import PyMuPDFLoader,DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from pinecone import Pinecone
from typing import List, Dict, Any
from langchain_core.documents import Document
import os

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")    

def load_model():
    Model = ChatGroq(
    model="openai/gpt-oss-20b",
    api_key=GROQ_API_KEY
    )
    return Model


def load_pdfs_from_directory(dir_path):
    """
    Load all PDF files from a directory using PyMuPDFLoader.

    Args:
        directory_path (str): Path to the directory containing PDFs
        recursive (bool): Whether to load PDFs recursively

    Returns:
        List[Document]: List of LangChain Document objects (page-wise)
    """

    loader = DirectoryLoader(
        path=dir_path,
        glob="**/*.pdf",
        loader_cls=PyMuPDFLoader,
        show_progress=True
    )

    documents = loader.load()
    return documents


def filtered_docs(docs:List[Document])->List[Dict[str,Any]]:
  filterd_docs = []
  for doc in docs:
    filterd_docs.append({
        "page_content":doc.page_content,
        "metadata":doc.metadata['source'],
        "page":doc.metadata['page']
    })
  return filterd_docs



def chunks_and_overlap(docs: list) -> list:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    return splitter.split_documents(docs)


print("Hello world")
if __name__ == "__main__":
   print("Hello")
   path = r"C:\Users\HP\Desktop\Medical-Chatbot\Fullstack-Medical-Application\Backend\Data"
   Docs=load_pdfs_from_directory(dir_path=path)
   print("*************")
   print("*************")
   print("*************")
   filter_data = filtered_docs(docs=Docs)
   print(filter_data[12])
   print("*************")
   print("*************")
   print("*************")