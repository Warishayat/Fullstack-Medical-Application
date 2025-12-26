from Helper.vectorstore import vectorstore
from Helper.rag import load_pdfs_from_directory, filtered_docs, chunks_and_overlap

DATA_PATH = r"C:\Users\HP\Desktop\Medical-Chatbot\Fullstack-Medical-Application\Backend\Data"

print("Loading PDFs...")
documents = load_pdfs_from_directory(DATA_PATH)

# print("Filtering...")
# documents = filtered_docs(docs=documents)
# print(type(documents))

print("Chunking...")
chunks = chunks_and_overlap(documents)

print("Uploading to Pinecone...")
vectorstore.add_documents(chunks)
print("Ingestion complete")
