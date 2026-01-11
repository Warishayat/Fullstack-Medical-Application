from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Router import auth,chat,message


app = FastAPI(title="AI-Medical-Application",description="End to End working as a Saas Application. we have authentication for user pinecone vectorstore for storing the vectors, Groq large language model, react javascript framework for frontend Fastapi for backend langchain and langgraph for orchestration framework docker for deployment.",version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome():
    return{
        "status":201,
        "message" :"All routes are working fine"
    }

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(message.router)



if __name__ == "__main__":
    print("App is working up. Lets test everything on the app")