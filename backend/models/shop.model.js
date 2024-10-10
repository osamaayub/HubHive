import mongoose from "mongoose";


const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 1,
    max: 6,
    select: false
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    default: "Seller"
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  zipCode: {
    type: Number,
    required: true
  },
  withDrawalMethod: {
    type: Object
  },
  availableBalance: {
    type: Number,
    default: 0
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        default: "Processing"
      }
    }
  ]
}, { timestamps: true });



export const Shop = mongoose.model("Shop", shopSchema);