import { isAdmin, isAuthenticated } from "../middlewares/auth";

import express from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  activateUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getUser,
  getAllUsers,
  updateAddress,
  deleteAddress,
  updateAvatar,
  updatePassword
} from "../controllers/userController";

export const userRouter = express.Router();
//create a new user

userRouter.post("/new-user", createUser);

//login user

userRouter.post("/login", loginUser);

//Register user
userRouter.post("/activation", activateUser);

//logout user
userRouter.get("/logout", logoutUser);

//update user Info

userRouter.put("/update-user", isAuthenticated, updateUser);

//load User

userRouter.get("/getuser", isAuthenticated, getUser);

//all Users For Admin

userRouter.get("/Admin/users", isAuthenticated, isAdmin("Admin"), getAllUsers);

//get single User

userRouter.get("/user-details/:id", getSingleUser);

//delete user by Admin
userRouter.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), deleteUser);


//update user address

userRouter.put("/address/:id", isAuthenticated, updateAddress);

//delete  user address

userRouter.delete("/delete-address/:id", isAuthenticated, deleteAddress);

//update user password

userRouter.put("/update-password", isAuthenticated, updatePassword);

//update  user avatar

userRouter.put("/update-avatar", isAuthenticated, updateAvatar);