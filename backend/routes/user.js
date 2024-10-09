import {isAdmin,isAuthenticated}from "../middlewares/auth";

import express from "express";

export const userRouter = express.Router(); 



//create a new user

userRouter.post("/new-user",createUser);

//login user

userRouter.post("/login",loginUser);

//Register user
userRouter.post("/register", registerUser);

//logout user
userRouter.get("/logout", logoutUser);

//update user 

userRouter.put("/update-user", isAuthenticated,updateUser);

//load User

userRouter.get("/get-user", isAuthenticated,getUser);

//all Users For Admin

userRouter.get("/admin-all-users", isAuthenticated,isAdmin("Admin"),getAllUsers);

//get single User

userRouter.get("/user-details/:id",getSingleUser);

//delete user 
userRouter.delete("/delete-user/:id",deleteUser);


//adress routes

userRouter.put("/address/:id",updateAddress);

//delete address

userRouter.delete("/delete-address/:id",deleteAddress);

//update password

userRouter.put("/update-password",updatePassword);
