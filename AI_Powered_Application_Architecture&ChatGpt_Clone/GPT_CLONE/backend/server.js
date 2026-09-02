import express from'express'
import db from'./db/dbConfig.js'
import mainRouter from'./src/api/main.route.js'
import errorHandler from'./src/middleware/error.handler.js'
        const app = express();

        // Middleware to parse JSON requests
        app.use(express.json());
        app.use('/api', mainRouter);

        app.use(errorHandler); // Use the error handler middleware
        
// // Endpoint to create a new chat conversation
// app.post("/api/chat/conversation", async (req, res) => {
//     res.send("Creating a new chat conversation...");
// });

// // Endpoint to fetch chat conversations
// app.get("/api/chat/conversations", async (req, res) => {
//     res.send("Fetching chat conversations...");
// });


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