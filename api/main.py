from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Note(BaseModel):
    title: str
    description: str

@app.get("/notes")
async def list():
    return {}

@app.get("/notes/{note_id}")
async def one(note_id):
    return {}

@app.post("/notes")
async def add(note:Note):
    return {}

@app.put("/notes")
async def update(note_id):
    return {}

@app.delete("/notes/{note_id}")
async def drop(note_id):
    return {}