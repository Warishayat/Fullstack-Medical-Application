from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Router import auth,chat


app = FastAPI()

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
        "status":200,
        "message" : """
        These are some endpoints which will work
        1:--------------> /user/register
        2:--------------> /user/login
        3:--------------> /medical/chat
        """
    }

app.include_router(auth.router)
app.include_router(chat.router)