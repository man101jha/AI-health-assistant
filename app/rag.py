from transformers.masking_utils import chunked_overlay
from langchain_community.document_loaders import DirectoryLoader,TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.embeddings import get_vector_store
import os
from app.llm import get_llm

def ingest_docs(data_path:str="data"):
    """
    Reads document splits them into chunks and store them in chromaDB

    """
    # 1. Load the documents
    # Note: We use a glob to find all .txt files in our data folder
    loader=DirectoryLoader(data_path,glob="**/*.txt",loader_cls=TextLoader)
    documents=loader.load()
    if not documents:
        print("No document found to ingest !")
        return
    
    #split into chunks
    text_splitter=RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks=text_splitter.split_documents(documents)
    vector_store=get_vector_store()
    vector_store.add_documents(chunks)
    print(f"Successfully ingested {len(chunks)} chunks into the vector store!")

def retrieve_docs(query:str,k:int=3):
    """
    Takes a user query and returns the top 'k' most relevant chunks.
    """
    vector_store=get_vector_store()
    results=vector_store.similarity_search(query,k=k)

    return results

#system prompt
SYSTEM_PROMPT = """
You are a dedicated Healthcare AI Assistant. Your goal is to provide accurate, 
helpful, and concise information based ONLY on the provided context.
Rules:
1. Use the provided context to answer the user's question.
2. If the answer is not in the context, politely state that you don't have that 
   information and suggest they consult a medical professional.
3. Do not mention that you are an AI or mention 'the context' to the user. 
   Just give the answer directly.
4. Keep your tone professional and empathetic.
Context:
{context}
User Question:
{question}
Answer:
"""

def generate_answer(query:str):
    """
    the full RAG pipeline : Retrive docs-> Format prompt-> Generate answer.
    """
    #1. Retrieve
    docs=retrieve_docs(query)

    context="\n\n".join([doc.page_content for doc in docs])
    prompt=SYSTEM_PROMPT.format(context=context,question=query)
    llm=get_llm()
    response=llm.invoke(prompt)
    return response.content
