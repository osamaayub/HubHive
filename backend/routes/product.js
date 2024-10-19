const express = require("express");
const { isAdmin, isSeller, isAuthenticated } = require("../middlewares/auth");
const { createProduct, getAllProducts, getProducts, updateReview, deleteProduct, manageProducts } = require("../controllers/productController");


const productRouter = express.Router();


//create a new product


productRouter.post("/new-product", createProduct);

//get all the products of the shop
productRouter.get("/get-all-shop-items/:id", getAllProducts);


//delete a product from the shop

productRouter.delete("/delete-shop-item/:id", isSeller, deleteProduct);

//get all the shop Items

productRouter.get("/get-all-products", getProducts);

//update a review about a product

productRouter.put("/create-new-review", isAuthenticated, updateReview);


//products managed by admin

productRouter.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), manageProducts);

module.exports = productRouter;