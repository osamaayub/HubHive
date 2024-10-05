import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  images: [
    {
     public_id:{
      type:String,
      required:true
     },
     url:{
      type:String,
      required:true
     }
    }
]
}, { timestamps: true });


export const Message = mongoose.model("Message", messageSchema);


