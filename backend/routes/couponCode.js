import express from "express";
import { isSeller } from "../middlewares/auth";
import { createNewCoupon, getCouponCode, deleteCouponCode, getCouponCodebyName } from "../controllers/couponController";

export const couponCodeRouter = express.Router();

//create a new coupon

couponCodeRouter.post("/create-new-coupon", isSeller, createNewCoupon);

//get  coupon code

couponCodeRouter.get("/get-coupon-code/:id", isSeller, getCouponCode);


//delete coupon code

couponCodeRouter.delete("/delete-coupon-code/:id", isSeller, deleteCouponCode);

//get coupon code by name

couponCodeRouter.get("/get-coupon-code/:name", isSeller, getCouponCodebyName);