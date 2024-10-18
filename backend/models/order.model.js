const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Processing"
  },
  user: {
    type: Object,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    status: {
      type: String
    }
  },
  paidAt: {
    type: Date,
    required: true
  },
  deliveredAt: {
    type: Date
  }
}, { timestamps: true });

const Order = mongoose.model("model", orderSchema);

module.exports = Order;