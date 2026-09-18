// import { GoogleGenAI } from "@google/genai";
// import dotenv from 'dotenv'

// dotenv.config();

// const GEMINI_API_KEYy = process.env.GEMINI_API_KEY;

// const ai = new GoogleGenAI({
//     apiKey:GEMINI_API_KEYy
// });

// async function main() {
//     try{


   
//   const interaction = await ai.models.embedContent({
//     model: "gemini-embedding-001",
//     contents: "How does AI work?",
//   });
//   console.log(interaction.embeddings);

//  }catch(error){
//     console.log("error when fetching from the model",error)
//  }
// }
// await main();

const cosineSimilarity = (vecA, vecB)=>{
//dot product of two sample vectors
let dotProduct = 0;

let magnitudeA = 0;
let magnitudeB = 0;

for(let i = 0; i < vecA.length;i++){
    dotProduct += vecA[i] * vecB[i];
    magnitudeA +=vecA[i]*vecA[i];
    magnitudeB += vecB[i] * vecB[i];
}
magnitudeA = Math.sqrt(magnitudeA);
magnitudeB = Math.sqrt(magnitudeB);

if(magnitudeA === 0 || magnitudeB === 0 ){

    return 0;
 }
 return dotProduct / (magnitudeA * magnitudeB);
}

const vect1 = [0,2];
const vect2 = [3,1];

console.log(cosineSimilarity(vect1, vect2));