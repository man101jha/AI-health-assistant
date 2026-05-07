from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from app.config import settings

def get_embeddings():
    """
    Initializes and returns the HuggingFace embedding model.
    """
    # We must return the initialized model here
    return HuggingFaceEmbeddings(model_name=settings.EMBEDDING_MODEL_NAME)

def get_vector_store():
    """
    Connects to our local ChromaDB 'vault'.
    """
    # 1. Get the translator model
    embeddings_model = get_embeddings()
    
    # 2. Connect to the database using that model
    vector_store = Chroma(
        persist_directory=settings.CHROMA_DB_DIR,
        embedding_function=embeddings_model,
        collection_name=settings.COLLECTION_NAME
    )
    return vector_store
