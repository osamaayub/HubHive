import express from "express";

import { isSeller, isAdmin, isAutenticated } from "../middlewares/auth";

export const shopRouter = express.Router();





//create a new shop 

shopRouter.post("/create-new-shop", isSeller, createNewShop);

//login into the shop
shopRouter.post("/login-shop", loginShop);

//get Seller in the shop

shopRouter.get("/getSellers", isSeller, getSellers);

//logout from the shop

shopRouter.get("/logout-shop", logoutShop);

//get shop info

shopRouter.get("/get-shop-info/:id", getShopInfo);

//update the shop avatar

shopRouter.put("/update-shop-avatar/:id", isSeller, updateShopAvatar);

// admin will managed all the sellers 

shopRouter.get("/admin-all-sellers", isAutenticated, isAdmin("Admin"), getAllSellersData);

//delete all sellers managed by admin
shopRouter.delete("/delete-sellers/:id", isAutenticated, isAdmin("Admin"), deleteSellerData);


//update withdrawal method by seller

shopRouter.put("/update-payment-method/:id", isSeller, updatePaymentMethod);
//delete withdrawal method by seller
shopRouter.delete("/delete-payment-method/:id", isSeller, deletePaymentMethod);
