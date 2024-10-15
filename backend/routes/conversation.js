import express from "express";
import { isSeller, isAuthenticated } from "../middlewares/auth";

import { createNewConversation, getSellerConversations, getUserConversation, updateConversation } from "../controllers/conversationController";

export const conversationRouter = express.Router();



//create a new conversation

conversationRouter.post("/create-new-conversation", createNewConversation);

//get all conversation for seller

conversationRouter.get("/get-seller-conversation/:id", isSeller, getSellerConversations);

//get all conversation for user 

conversationRouter.get("/get-user-conversation/:id", isAuthenticated, getUserConversation);

//update the conversation

conversationRouter.put("/update-conversation/:id", updateConversation);