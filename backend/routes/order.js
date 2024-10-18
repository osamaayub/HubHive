import express from "express";
import { isAdmin, isSeller, isAuthenticated } from "../middlewares/auth.js";
import {
  getOrders,
  getAllOrders,
  updateOrderStatus,
  updateRefundUser,
  updateRefundSeller
} from "../controllers/orderController.js";
export const orderRouter = express.Router();


//get  User orders

orderRouter.get("/users/orders/:userId", getOrders);



//create a new Order

orderRouter.post("/new-order", createNewOrder);


//admin get all orders
orderRouter.get("/admin/orders", isAuthenticated, isAdmin("Admin"), getAllOrders);

//give refund for the User
orderRouter.put("/user/order-refund/:id", updateRefundUser);
//give refund for the seller
orderRouter.put("/seller/order-refund/:id", updateRefundSeller);
//update order status for seller
orderRouter.put("/seller/order-status/:id", isSeller, updateOrderStatus);