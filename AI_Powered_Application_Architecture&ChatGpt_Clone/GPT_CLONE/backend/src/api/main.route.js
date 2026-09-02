//importing express router
import express from 'express';
import chatRouter from './chat/chat.route.js';

//importing the express router
const mainRouter = express.Router();

// Mount the chatRouter on the mainRouter
mainRouter.use('/chat', chatRouter);

// Endpoint to create a new chat conversation
export default mainRouter;