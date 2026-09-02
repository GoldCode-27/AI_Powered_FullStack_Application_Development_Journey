 
 import { createConversationService } from '../service/chat.service.js';
 //function to handle errors
 export async function createConversationController(req, res) {
    
   try {
     const { question } = req.body;
     const result = await createConversationService(question);
        res.status(201).json({ 
            success: true,
            message: 'Conversation created successfully',
            data: result
        });

    }catch (err) {
     throw (err);
 }
}

//functiom to handle errors
export async function getConversationsController(req, res) {
   try {
    res.send("Fetching chat conversations...");
    }catch (err) {
     throw (err);
 }
};
