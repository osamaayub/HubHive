const { Message } = require("../models/message.model");
const cloudinary = require("cloudinary").v2;

const createNewMessage = async (req, res) => {
  try {
    const messageData = req.body;
    const uploadMessage = await cloudinary.uploader.upload({
      folder: "messages"
    });
    messageData.images = {
      public_id: uploadMessage.public_id,
      url: uploadMessage.url
    }
    const { conversationId, text, sender } = req.body;
    const newMessage = await Message.create({
      conversationId: conversationId,
      text: text,
      send: sender,
      images: messageData.images ? messageData.images : undefined

    })
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
const getAllMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.find({ conversationId: id });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { createNewMessage, getAllMessage }