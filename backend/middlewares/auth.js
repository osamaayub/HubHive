import {verifyToken} from "../utils/tokenUtils";

import  { User } from "../models/user.model";

import {Shop} from "../models/shop.model";




//Check if User is Authenticated or not
const isAuthenticated=async(req,res,next)=>{
   const {token}=req.cookies;
   if(!token){
     return res.status(401).json({message:"UnAuthorized User,Please Login to Continue"});
   }
    const decodeToken=verifyToken(token);
    req.user=await User.findById(decodeToken.id);
    next();
}


//For seller
const isSeller=async(req,res,next)=>{
   const {token}=req.cookies;
   if(!token){
    return res.status(401).json({message:"Authorized Seller please login to continue"});
   }
   const decodedToken=verifyToken(token);
   req.shop=await Shop.findById(decodedToken.id);
   next();

}

//For Admin
const isAdmin=(...roles)=>{

  return ((req,res,next)=>{
    if(!roles.includes(req.user.role)){
     res.status(401).json({message:`UnAuthorized User Only Admins can Access ${req.user.role}`});
    }
    next();
  })
    
}


export {isAuthenticated,isAdmin,isSeller}