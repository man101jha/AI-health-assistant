import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    #LLM Settings
    GROQ_API_KEY:str=os.getenv("GROQ_API_KEY")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
    
    # Embedding Settings
    EMBEDDING_MODEL_NAME: str = os.getenv("EMBEDDING_MODEL_NAME", "sentence-transformers/all-MiniLM-L6-v2")

    # Vector Database Settings
    CHROMA_DB_DIR: str = os.getenv("CHROMA_DB_DIR", "./vector_store")
    COLLECTION_NAME: str = os.getenv("COLLECTION_NAME", "healthcare_docs")

    # Backend Settings
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8000")

# Create a single instance of settings to be used across the application
settings=Settings()