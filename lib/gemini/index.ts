import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY ?? '');

// ...

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

// The Gemini 1.5 models are versatile and work with most use cases
export const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});

