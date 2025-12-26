from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.documents import Document
from Helper.vectorstore import vectorstore
from Helper.rag import load_model

load_dotenv()

retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
model = load_model()

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
        "context": retriever | format_docs,
        "question": RunnablePassthrough()
    }
    | prompt
    | model
    | StrOutputParser()
)

while True:
    question = input("Ask me a question: ")

    if question.lower() in ["exit", "bye", "quit"]:
        print("Goodbye")
        break

    answer = chain.invoke(question)
    print("Model Answer:", answer)
