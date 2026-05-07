from fastapi import FastAPI,BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.agent import run_agent
from app.rag import ingest_docs

app=FastAPI(title="Healthcare AI Assistant")

#CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

class QueryRequest(BaseModel):
    question:str

@app.get('/health')
def health_check():
     return {"status": "healthy", "service": "healthcare-ai-assistant"}

@app.post('/ingest')
def trigger_ingestion():
    ingest_docs()
    return {"message":"Ingestion successful!"}

@app.post("/ask")
def ask_question(request:QueryRequest):
    answer=run_agent(request.question)
    return {"answer":answer}
