import mongoose from "mongoose";



const productSchema=new mongoose.Schema({
  name:{
    type:String,
    Required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
   type:String,
   required:true
  },
  originalPrice:{
    type:Number,
    required:true
  },
  tags:{
    type:String
  },
  discountedPrice:{
    type:Number,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  images:[
    {
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  }]
},{timestamps:true});


export const Product=mongoose.model("Product",productSchema);

