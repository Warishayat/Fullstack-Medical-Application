import os
from dotenv import load_dotenv
from typing import List, Annotated, TypedDict

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage, HumanMessage, BaseMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver

from Helper.vectorstore import vectorstore
from Helper.rag import load_model


load_dotenv()

class State(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]

retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
model = load_model()

def format_docs(docs: list) -> str:
    return "\n\n".join(doc.page_content for doc in docs)

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are MediBot, a specialized Medical AI Assistant. 
    
    GUIDELINES:
    1. CONTEXT & HISTORY: Use the provided context and previous messages to answer.
    2. MEDICAL ONLY: If the user asks something non-medical (politics, sports, etc.), politely respond: 
       'My expertise is limited to medical and health-related inquiries. How can I assist you with your health today?'
    3. UNCERTAINTY: If the answer is medical but not in the context, suggest consulting a healthcare professional instead of just saying you don't know."""),
    MessagesPlaceholder(variable_name="messages"),
    ("user", "Context:\n{context}\n\nQuestion: {question}")
])

rag_chain = prompt | model | StrOutputParser()

def chatbot_node(state: State):
    user_message = state['messages'][-1].content
    docs = retriever.invoke(user_message)
    context = format_docs(docs)
    response = rag_chain.invoke({
        "messages": state['messages'], 
        "context": context,
        "question": user_message
    })
    
    return {"messages": [AIMessage(content=response)]}

workflow = StateGraph(State)
workflow.add_node("chatbot", chatbot_node)
workflow.add_edge(START, "chatbot")
workflow.add_edge("chatbot", END)

memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

if __name__ == "__main__":
    print("\n" + "="*40)
    print("      MediBot AI Professional Terminal      ")
    print("="*40)
    print("Type 'exit' or 'quit' to stop the chat.\n")
    
    config = {"configurable": {"thread_id": "test_session_001"}}

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("MediBot: Allah Hafiz! Take care of your health.")
            break
            
        try:
            input_state = {"messages": [HumanMessage(content=user_input)]}
            result = app.invoke(input_state, config=config)
            
            bot_response = result["messages"][-1].content
            print(f"MediBot: {bot_response}\n")
            
        except Exception as e:
            print(f"Error occurred: {e}")