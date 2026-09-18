import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config();

const GEMINI_API_KEYy = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey:GEMINI_API_KEYy
});

async function main() {
    try{


   
  const interaction = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: "How does AI work?",
  });
  console.log(interaction.embeddings);

 }catch(error){
    console.log("error when fetching from the model",error)
 }
}
main();