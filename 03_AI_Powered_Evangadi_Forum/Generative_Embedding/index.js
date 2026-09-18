import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey:GEMINI_API_KEY
});

async function main() {
  const interaction = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: "How does AI work?",
  });
  console.log(interaction.embeddings);
}
await main();