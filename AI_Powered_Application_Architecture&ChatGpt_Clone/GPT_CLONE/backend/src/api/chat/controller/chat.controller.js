 
 import { createConversationService, getRecentConversationsRows } from '../service/chat.service.js';

 //function to handle creating a new conversation
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

//functiom to handle fetching conversations
export async function getConversationsController(req, res) {
   try {
    const result = await getRecentConversationsRows(100);
    res.status(200).json({ 
        success: true,
        message: 'Conversations fetched successfully',
        data: result
    });
    
    }catch (err) {
     throw (err);
 }
};
