const express = require("express");
const { isSeller, isAuthenticated } = require("../middlewares/auth");

const { createNewConversation, getSellerConversations, getUserConversation, updateConversation } = require("../controllers/conversationController");

const conversationRouter = express.Router();



//create a new conversation

conversationRouter.post("/create-new-conversation", createNewConversation);

//get all conversation for seller

conversationRouter.get("/get-seller-conversation/:id", isSeller, getSellerConversations);

//get all conversation for user 

conversationRouter.get("/get-user-conversation/:id", isAuthenticated, getUserConversation);

//update the conversation

conversationRouter.put("/update-conversation/:id", updateConversation);

module.exports = conversationRouter;