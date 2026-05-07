from app.llm import get_llm
from app.rag import generate_answer

def run_agent(user_query:str):
    """
    Decides whether the query is medical ,administrative or out-of-scope.
    """
    llm=get_llm()
    routing_prompt=f"""
     Classify the following user query into one of these categories:
    - MEDICAL: Questions about diseases, symptoms, treatments, or health advice.
    - APPOINTMENT: Questions about booking, scheduling, or changing appointments.
    - OTHER: Greetings, gibberish, or unrelated topics.
    User Query: {user_query}
    
    Only return one word: MEDICAL, APPOINTMENT, or OTHER.
    

    """
    classification=llm.invoke(routing_prompt).content.strip().upper()

    # 2. Route based on the classification
    if "MEDICAL" in classification:
        return generate_answer(user_query)
    
    elif "APPOINTMENT" in classification:
        return "I can help you with that! To book or change an appointment, please provide your preferred date and department."
    
    else:
        return "I am a Healthcare Assistant. I can help with medical questions or appointment info. How can I assist you today?"

