import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_EMBED_MODEL = 'gemini-embedding-001';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
};


async function compareTexts() {
    try {
        
  const text1 = 'What is json?';
  const text2 = 'what is javascript object notation?';
  const text3 = 'what is the capital city of Ethiopia?';

  // Generate embeddings and extract the number arrays (.values)
  const res1 = await ai.models.embedContent({
    model: GEMINI_EMBED_MODEL,
    contents: text1,
    config: { taskType: 'SEMANTIC_SIMILARITY' },
  });
  const vec1 = res1.embeddings[0].values;

  const res2 = await ai.models.embedContent({
    model: GEMINI_EMBED_MODEL,
    contents: text2,
    config: { taskType: 'SEMANTIC_SIMILARITY' },
  });
  const vec2 = res2.embeddings[0].values;

  const res3 = await ai.models.embedContent({
    model: GEMINI_EMBED_MODEL,
    contents: text3,
    config: { taskType: 'SEMANTIC_SIMILARITY' },
  });
  const vec3 = res3.embeddings[0].values;

  // Compare similarity using cosine similarity
  const similarity1and2 = cosineSimilarity(vec1, vec2);
  const similarity1and3 = cosineSimilarity(vec1, vec3);

  console.log(`Similarity (Text 1 & Text 2): ${similarity1and2}`);
  console.log(`Similarity (Text 1 & Text 3): ${similarity1and3}`);
        
    } catch (error) {
        console.log("error when fetching", error)
    }
}


await compareTexts();
