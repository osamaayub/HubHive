const express = require("express");

const { isSeller, isAdmin, isAuthenticated } = require("../middlewares/auth");

const {
  createNewShop,
  activateUser,
  loginShop,
  getSellers,
  logoutShop,
  getShopInfo,
  updatePaymentMethod,
  updateShopAvatar,
  deletePaymentMethod,
  deleteSellerData,
  getSellersData,
  updateSellerData

} = require("../controllers/shopController");
const shopRouter = express.Router();





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

shopRouter.get("/admin/sellers", isAuthenticated, isAdmin("Admin"), getSellersData);

//delete all sellers managed by admin
shopRouter.delete("/delete-sellers/:id", isAuthenticated, isAdmin("Admin"), deleteSellerData);


//activate User 
shopRouter.post("/activation", activateUser);
//update withdrawal method by seller

//update seller data 
shopRouter.put("/update-seller-info", isSeller, updateSellerData);

shopRouter.put("/update-payment-method/:id", isSeller, updatePaymentMethod);
//delete withdrawal method by seller
shopRouter.delete("/delete-payment-method/:id", isSeller, deletePaymentMethod);

module.exports = shopRouter;