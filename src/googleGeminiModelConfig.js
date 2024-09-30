import { GoogleGenerativeAI } from '@google/generative-ai';


const apiKey = process.env.GOOGLE_GEMINI_API_KEY;


const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro'
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
  timeout: 180000 
};


export const chatSessionGoogleGemini = model.startChat({
  generationConfig,
  history: [],
});