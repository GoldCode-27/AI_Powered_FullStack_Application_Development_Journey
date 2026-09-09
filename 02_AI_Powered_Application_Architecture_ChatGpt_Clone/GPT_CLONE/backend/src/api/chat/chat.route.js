//importing express router
import express from "express";

//import conversation controller functions
import {
  createConversationController,
  getConversationsController,
  deleteConversationController,
} from "./controller/chat.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import {
  validateConversationId,
  validateCreateConversation,
} from "../../middleware/chatValidator.js";

//importing the express router
const chatRouter = express.Router();
chatRouter.use(requireAuth);

// Endpoint to create a new chat conversation
chatRouter.post("/conversations",validateCreateConversation,createConversationController,
);

// Endpoint to fetch chat conversations
chatRouter.get("/conversations", getConversationsController);

// Endpoint to delete chat conversation
chatRouter.delete("/conversations/:id",validateConversationId,deleteConversationController,
);

export default chatRouter;
