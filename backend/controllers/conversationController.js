import { Conversation } from "../models/conversation.model";



//create New Conversation

export const createNewConversation = async (req, res) => {

  try {
    const { title, userId, memberId } = req.body;
    const conversation = await Conversation.findOne({
      title: new Regex(`^${title}$`, "i")
    });
    if (conversation) {
      res.status(200).json({ sucess: true, conversation });
    }
    else {
      const newConversation = await Conversation.create({
        title: title,
        members: [userId, memberId]
      });
      res.status(201).json(newConversation);

    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//get seller Conversations

export const getSellerConversations = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.find({
      $in: members[id]
    }).sort({ updatedAt: -1, createdAt: -1 });
    res.status(200).json({
      sucess: true,
      conversation
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get User Conversation


export const getUserConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const userConversation = await Conversation.find({
      $in: members[id]
    }).sort({ updatedAt: -1, createdAt: -1 });
    res.status(200).json({
      sucess: true,
      userConversation
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update the conversation

export const updateConversation = async (req, res) => {

  try {
    const { id } = req.params;
    const { lastMessage, lastMessageId } = req.body;
    const update_conversation = await Conversation.findByIdAndUpdate(id,
      lastMessage, lastMessageId);
    if (!update_conversation) return res.status(404).json({ message: "conservation not found" });
    res.status(200).json(update_conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}