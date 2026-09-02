
import db from '../../../../db/dbConfig.js';
// Service functions for chat operations
export async function createConversationService(question) {
    try {
        const [result] = await db.execute(
            'INSERT INTO conversations (role, content) VALUES (?, ?)',
            ['user', question]
        );
        
        return `chat saved to db with question: ${question}`;
    } catch (err) {
        throw (err);
    }
}

export const getRecentConversationsRows = async (limit=5) => {
   const normalizedLimit = Number.parseInt(limit, 10);
   const safeLimit = 
           Number.isNaN(normalizedLimit) || normalizedLimit <= 0 ? 20 : normalizedLimit;
        const [rows] = await db.execute(`SELECT id, role, content, created_at FROM conversations ORDER BY id DESC LIMIT ${safeLimit}`);
        return rows.reverse();
};

