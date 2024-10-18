const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "Running"
  },
  tags: {
    type: String
  },
  orignalPrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String
      }
    }
  ]
}, { timestamps: true });

// Change the export statement to CommonJS
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
