import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    connectionLimit: 10, // Adjust the connection limit as needed
    queueLimit: 0, // Unlimited queueing
    waitForConnections: true, // Wait for connections if the pool is full
});

export default db;