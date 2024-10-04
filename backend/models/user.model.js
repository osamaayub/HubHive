import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
  ,password:{
    type:String,
    required:true
  }
  ,phoneNumber:{
    type:Number
  },
  address:[
    {
      country:{
        type:String,
        required:true
      }
      ,city:{
        type:String,
        required:true
      }
      ,homeAddress:{
        type:String,
        required:true
      }
      ,postalCode:{
        type:String,
        required:true
      },
       addressType: {
        type: String
      }
    },
  ],
  role:{
    type:String,
    default:"user"
  },
  avatar:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  }

},{timestamps:true});

export const User=mongoose.model("User",userSchema);