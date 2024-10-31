import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


load_dotenv()


groq_api_key = os.getenv('GROQ_API_KEY')


llm_model = ChatGroq(
    groq_api_key=groq_api_key,
    model_name="Llama3-8b-8192"
)


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class textFromFrontendModel(BaseModel):
    textFromNextJSFrontend: str



@app.get('/')
def welcome():
    return {
        'success': True,
        'message': 'server of "fitbites is up and running successfully '
    }


@app.post('/generateanswer')
async def predict(incomingTextFromFrontend: textFromFrontendModel):

    prompt_text = incomingTextFromFrontend.textFromNextJSFrontend

    prompt_template = ChatPromptTemplate.from_template(
        """
        {text}
        """
    )

    chain = prompt_template | llm_model
    
    response_from_model = chain.invoke({"text": prompt_text})

    return {
        'success': True,
        'response_from_model': response_from_model
    }

