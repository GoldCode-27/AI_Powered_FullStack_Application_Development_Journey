
// Service functions for chat operations
export async function createConversationService(question) {
    try {
        return `chat saved to db with question: ${question}`;
    } catch (err) {
        throw (err);
    }
}