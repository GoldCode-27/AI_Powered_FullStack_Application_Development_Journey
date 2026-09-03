import db from "../../../../db/dbConfig.js";
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = process.env.GEMINI_MODEL_NAME || "gemini-3.5-flash-lite";

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// function to fetch recent conversations from the database
export const getRecentConversationsRows = async (limit = 5) => {
  try {
    const normalizedLimit = Number.parseInt(limit, 10);
    const safeLimit =
      Number.isNaN(normalizedLimit) || normalizedLimit <= 0
        ? 20
        : normalizedLimit;

    const [rows] = await db.execute(
      `SELECT id, content,role, created_at FROM conversations ORDER BY id DESC LIMIT ${safeLimit}`,
    );

    // returning the conversations in reverse order to show the most recent first
    return [...rows].reverse();
  } catch (error) {
    console.error("Error fetching recent conversations:", error);
    throw error;
  }
};

//function to handle generating response from Gemini assistant
export const generateAssistantAnswer = async ({ history, question }) => {
  // Format the history for Gemini chat
  const formattedHistory = (history ?? []).map((row) => ({
    role: row.role === "assistant" ? "model" : "user",
    parts: [{ text: row.content }],
  }));

  //sample history format
  // [{
  //     role: 'user',
  //     parts: [{ text: 'Hello, how are you?' }]
  // },
  // {
  //     role: 'model',
  //     parts: [{ text: 'I am doing well, thank you for asking!' }]
  // }
  // ]

  const chat = geminiClient.chats.create({
    model: GEMINI_MODEL,

    history: formattedHistory,
  });

  const result = await chat.sendMessage({ message: question });
  console.log("Gemini response:", result.text);
  return {
    text: result.text,
    totalTokens: result.usageMetadata.totalTokenCount,
  };
};

const getMessageById = async (messageId) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, role, content, token_count, created_at FROM conversations WHERE id = ? LIMIT 1",
      [messageId],
    );

    if (!rows[0]) return null; // Return null if no message is found with the given ID
    return {
      id: rows[0].id,
      role: rows[0].role,
      content: rows[0].content,
      token_count: rows[0].token_count,
      created_at: rows[0].created_at,
    };

    return rows[0];
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    throw error;
  }
};

// Service functions for chat operations
export const createConversationService = async (question) => {
  try {
    // checking validation for question
    if (!question.trim()) {
      const error = new Error("question is required.");
      error.status = 400; // Bad Request
      throw error;
    }

    const historyRows = await getRecentConversationsRows(5);

    // save to database
    const [result] = await db.execute(
      'INSERT INTO conversations (content, role) VALUES (?, "user")',
      [question],
    );

    const { text, totalTokens } = await generateAssistantAnswer({
      history: historyRows,
      question,
    });

    const [createAssistantMessageResult] = await db.execute(
      "INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)",
      ["assistant", text, totalTokens],
    );

    const userConversion = await getMessageById(result.insertId);
    const assistantConversion = await getMessageById(
      createAssistantMessageResult.insertId,
    );
    // returning the newly created conversation with its ID
    return {
      assistantConversation: assistantConversion,
      userConversation: userConversion,
    };
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};
