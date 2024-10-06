import mongoose from "mongoose";


const couponCodeSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  minAmount:{
    type:Number,
  },
  maxAmount:{
    type:Number
  },
  value:{
    type:Number,
    required:true
  },
  selectedProduct:{
    type:String,
    required:true
  },
  shopId:{
    type:String,
    required:true
  }
},{timestamps:true});


export const CoupCode=mongoose.model("CouponCode",couponCodeSchema);