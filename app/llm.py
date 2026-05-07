from langchain_groq import ChatGroq
from app.config import settings


def get_llm():
    """
    The Groq LLM with our API key

    """
    return ChatGroq(
        groq_api_key=settings.GROQ_API_KEY,
        model_name=settings.LLM_MODEL,
        temperature=0
    )

    