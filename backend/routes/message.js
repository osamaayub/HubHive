import express from "express";

export const messageRouter = express.Router();


//create a new message

messageRouter.post("/create-new-message", createNewMessage);

//get all the messages

messageRouter.get("get-all-messages/:id", getAllMessage);