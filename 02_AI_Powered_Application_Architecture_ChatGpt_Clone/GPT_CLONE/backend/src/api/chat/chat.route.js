//importing express router
import express from "express";

//import conversation controller functions
import {
  createConversationController,
  getConversationsController,
} from "./controller/chat.controller.js";

//importing the express router
const chatRouter = express.Router();

// Endpoint to create a new chat conversation
chatRouter.post("/conversations", createConversationController());

// Endpoint to fetch chat conversations
chatRouter.get("/conversations", getConversationsController());

export default chatRouter;
