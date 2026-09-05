import db from "../../../../db/dbConfig.js";
// importing the Google Generative AI client instead of the Gemini client for bettermodel manipulation and response handling
import { GoogleGenerativeAI } from "@google/generative-ai";

// importing the environment variable for the Gemini model name, defaulting to "gemini-3.5-flash-lite" if not set
const GEMINI_MODEL = process.env.GEMINI_MODEL_NAME || "gemini-3.5-flash-lite";

//creating an instance of the GoogleGenerativeAI client using the GEMINI_API_KEY from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// function to fetch recent conversations from the database, with a default limit of 10
export const getRecentConversationsRows = async (limit = 10, userId) => {
  try {
    const normalizedLimit = Number.parseInt(limit, 10);
    const safeLimit =
      Number.isNaN(normalizedLimit) || normalizedLimit <= 0
        ? 20
        : normalizedLimit;

    const [rows] = await db.execute(
      `SELECT id, content, role, created_at FROM conversations WHERE user_id = ? ORDER BY id DESC LIMIT ?`,
      [userId, safeLimit],
    );

    return [...rows].reverse();
  } catch (error) {
    console.error("Error on fetching recent conversations:", error);
    throw error;
  }
};

// function to generate an assistant's answer using the Google Generative AI client
export const generateAssistantAnswer = async ({ history, question }) => {
  try {
    //shaping the model behavior
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction:
        "You are a specialized Software Development Assistant. Your expertise is strictly limited to programming, software architecture, debugging, and computer science. If a user asks a question unrelated to coding or technology, politely decline and state that you are only designed to assist with software development tasks.",
    });

    //formatting the history on real database for model understandable
    const formattedHistory = (history ?? []).map((row) => ({
      role: row.role === "asistant" ? "model" : "user",
      parts: [{ text: row.content }],
    }));

    //starting chat
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.2, // -->creativity
        maxOutputTokens: 1000, //-->amount of response strings
      },
    });

    //sending a message to the model
    const result = await chat.sendMessage(question);
    const response = await result.response;

    // console.log(response);

    const text = response.text();

    return {
      text: text,
      totalTokens: response.usageMetadata?.totalTokenCount || 0, //-->if AI return the token store here otherwise set zero for database
    };
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
};

//
const getMessageById = async (messageId, userId) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, role, content, token_count, created_at FROM conversations WHERE id = ? AND user_id = ? LIMIT 1",
      [messageId, userId],
    );

    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    console.error("Error on fetching message by ID:", error);
    throw error;
  }
};

export const createConversationService = async (question, userId) => {
  try {
    if (!question.trim()) {
      const error = new Error("question is required.");
      error.status = 400;
      throw error;
    }

    const historyRows = await getRecentConversationsRows(10, userId);

    //saving user's prompt
    const [result] = await db.execute(
      'INSERT INTO conversations (content, role, user_id) VALUES (?, "user", ?)',
      [question, userId],
    );

    //get answer form model
    const { text, totalTokens } = await generateAssistantAnswer({
      history: historyRows,
      question,
    });

    //saving the model's answer
    const [createAssistantMessageResult] = await db.execute(
      "INSERT INTO conversations (role, content, token_count, user_id) VALUES (?, ?, ?, ?)",
      ["asistant", text, totalTokens, userId],
    );

    const userConversation = await getMessageById(result.insertId, userId);
    const assistantConversation = await getMessageById(
      createAssistantMessageResult.insertId,
      userId,
    );

    return {
      assistantConversation,
      userConversation,
    };
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

// function deleting a conversation via ID
export const deleteConversationService = async (id, userId) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM conversations WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    // checking data on that assigned ID
    if (result.affectedRows === 0) {
      const error = new Error("Conversation not found.");
      error.status = 404;
      throw error;
    }

    return { message: "Conversation deleted successfully" };
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
