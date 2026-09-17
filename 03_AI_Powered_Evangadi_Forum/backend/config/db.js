import mysql from'mysql2/promise'

export const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER || "ai_forum",
    password: process.env.DB_PASSWORD || "ai_forum",
    database: process.env.DATABASE_NAME || "ai_forum",
    // port: process.env.db_port || 3306, // Points to MySQL port 3306
    connectionLimit: 10,
});



// Prepare a function that will execute the SQL queries asynchronously
export async function query(sql, data) {
  const [rows, fields] = await pool.execute(sql, data);
  return rows;
}

