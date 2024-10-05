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
  ,review:[
    {
      user:{
        type:Object
      },
      rating:{
        type:Number,
        min:1,
        max:5
      },
      comment:{
        type:String,
      },
      productId:{
        type:String,
      }
    }
  ]
},{timestamps:true});


export const Product=mongoose.model("Product",productSchema);

