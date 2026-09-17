import express from'express'
import dotenv from'dotenv'
import {pool} from './config/db.js'

dotenv.config();

const app = express();

const StartServer = async()=>{
  app.listen(process.env.PORT, (err)=>{
    if(err)
        console.log("server error");
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
})

const connection = await pool.getConnection();
   console.log("DB connected");
}

StartServer();
