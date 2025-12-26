from fastapi import FastAPI
from fastapi.middleware import cors


app = FastAPI()


@app.get("/")
def welcome():
    return{
        "status":200,
        "message" : "welcome to the home page of the application"
    }