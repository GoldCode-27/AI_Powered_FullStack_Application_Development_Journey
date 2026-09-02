import express from'express'
import db from'./db/dbConfig.js'

const app = express();
 

async function startServer(){

    db.getConnection()
    console.log('Connected to database');
    
const PORT = 3888;
app.listen(PORT, ()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
}
)};

startServer();