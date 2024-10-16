import express from "express";
import { isAdmin, isSeller, isAuthenticated } from "../middlewares/auth.js";
import { createProduct, getAllProducts, getProducts, updateReview, deleteProduct, manageProducts } from "../controllers/productController.js";


export const productRouter = express.Router();


//create a new product


productRouter.post("/new-product", createProduct);

//get all the products of the shop
productRouter.get("/get-all-shop-items/:id", getAllProducts);


//delete a product from the shop

productRouter.delete("/delete-shop-item/:id", isSeller, deleteProduct);

//get all the shop Items

productRouter.get("/get-all-products", getProducts)

//update a review about a product

productRouter.put("/create-new-review", isAuthenticated, updateReview);


//products managed by admin

productRouter.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), manageProducts);

