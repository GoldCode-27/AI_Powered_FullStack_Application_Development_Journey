import express from'express'
import db from'./db/dbConfig.js'

const app = express();
        // Middleware to parse JSON requests
        app.use(express.json());

        // Define your routes here
        app.post("/api/chat/conversation", async (req, res) => {
            res.send("Creating a new chat conversation...");
        });

        app.get("/api/chat/conversations", async (req, res) => {
            res.send("Fetching chat conversations...");
        });
async function startServer() {
    try {
        // Test the database connection
        const connection = await db.getConnection();
        console.log('Connected to database');
        
        //releasing the connection back to the pool
        connection.release();

        // Start the server
        const PORT = 3888;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
}

startServer();