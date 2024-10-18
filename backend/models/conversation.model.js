const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  members: {
    type: Array
  },
  lastMessage: {
    type: String
  },
  lastMessageId: {
    type: String
  }
}, { timestamps: true });

// Change the export statement to CommonJS
const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
