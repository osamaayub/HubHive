import express from "express";
import { isAdmin, isSeller, isAuthenticated } from "../middlewares/auth";

export const orderRouter = express.Router();


//get  User orders

orderRouter.get("/orders/:userId", getOrders);



//create a new Order

orderRouter.post("/new-order", createNewOrder);

//delete a order

orderRouter.delete("/delete-order/:id", deleteOrder);

//update a order

orderRouter.put("/update-order/:id", updateOrder);

//admin get all orders
orderRouter.get("/admin-all-orders", isAuthenticated, isAdmin("Admin"), getAllOrders);

//refund for the User

orderRouter.put("order-refund/:id", updateRefund);

//update order status for seller
orderRouter.put("/order-status/:id", isSeller, updateOrderStatus);