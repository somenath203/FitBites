import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain'
};

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}

async function startChatWithRetry(retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await withTimeout(
        model.startChat({
          generationConfig,
          history: [],
        }),
        180000 
      );
      return response;
    } catch (error) {
      if (i === retries - 1 || error.message !== '504 DEADLINE_EXCEEDED') {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

export const chatSessionGoogleGemini = async () => {
  try {
    const response = await startChatWithRetry();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
