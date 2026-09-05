//importing express router
import express from "express";
import chatRouter from "./chat/chat.route.js";
import authRouter from "./auth/auth.route.js";

//importing the express router
const mainRouter = express.Router();

// Mount the chatRouter on the mainRouter
mainRouter.use("/chat", chatRouter);
mainRouter.use("/auth", authRouter);

// Endpoint to create a new chat conversation
export default mainRouter;
