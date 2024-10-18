const express = require("express");
const { isSeller } = require("../middlewares/auth");
const { createNewCoupon, getCouponCode, deleteCouponCode, getCouponCodebyName } = require("../controllers/couponController");

const couponCodeRouter = express.Router();

//create a new coupon

couponCodeRouter.post("/create-new-coupon", isSeller, createNewCoupon);

//get  coupon code

couponCodeRouter.get("/get-coupon-code/:id", isSeller, getCouponCode);


//delete coupon code

couponCodeRouter.delete("/delete-coupon-code/:id", isSeller, deleteCouponCode);

//get coupon code by name

couponCodeRouter.get("/get-coupon-code/:name", isSeller, getCouponCodebyName);

module.exports = couponCodeRouter;