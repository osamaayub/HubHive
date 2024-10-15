import express from "express";
import "dotenv/config";
import cors from "cors";
import ConnectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";




const app = express();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json());

app.use(cors());

ConnectDB();



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
