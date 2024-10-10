import express from "express";
import { isSeller, isAdmin, isAuthenticated } from "../middlewares/auth";
import { createWithdrawRequest, getAllPayments, updateWithdrawRequest } from "../controllers/withdrawController";

const WithdrawRouter = express.Router();



//create a new withdraw request for seller only


WithdrawRouter.post("/create-withdraw-request", isSeller, createWithdrawRequest);


//get all  of the  withdraw request for admins

WithdrawRouter.get('/get-all-payments', isAuthenticated, isAdmin("Admin"), getAllPayments);

//update all of the withdraw request

WithdrawRouter.put("/update-withdraw-request/:id", updateWithdrawRequest);