 
 import { createConversationService, getRecentConversationsRows } from '../service/chat.service.js';


 
    //checking if the API key is working or not
    //  async function main(){
    //     const response = await geminiClient.models.generateContent({
    //         model: 'gemini-3.5-flash-lite',
    //         contents: 'what do you think on AI ethics?'
    //     });
    //      console.log(response.text);
    //  }
    
// main();

//   const createGeminiClient = () => {
//      if(!process.env.GEMINI_API_KEY) {
//         throw new Error('GEMINI_API_KEY is not set in the environment variables.');
//      }
   
//      return geminiClient;
//   }


 //function to handle creating a new conversation
 export const createConversationController = () => async (req, res) => {
    
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
export const getConversationsController = () => async (req, res) => {
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