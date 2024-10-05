import mongoose from "mongoose";


const withdrawSchema=new mongoose.Schema({
 seller:{
  type:Object,
  required:true
 },
 amount:{
  type:Number,
  required:true
 },
 status:{
  type:String,
  default:"Processing"
 }
},{timestamps:true});


export const Withdraw=mongoose.model("Withdraw",withdrawSchema);



