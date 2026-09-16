import express from'express'
const app = express();


const StartServer = async()=>{
    
  app.listen(process.env.PORT, (err)=>{
    if(err)
        console.log(err.message);
    console.log(`server is running on port http://localhost${process.env.PORT}`)
})
}

StartServer();