const mongoose = require("mongoose");


const withdrawSchema = new mongoose.Schema({
  seller: {
    type: Object,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Processing"
  }
}, { timestamps: true });


const Withdraw = mongoose.model("Withdraw", withdrawSchema);
module.exports = Withdraw;



