import express from "express";
import "dotenv/config";
import cors from "cors";
import ConnectDB from "./config/database.js";




const app=express();


app.use(express.json());
app.use(cors());

ConnectDB();



const PORT=process.env.PORT;
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})
