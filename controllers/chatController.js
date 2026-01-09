import ChatMessage from "../models/ChatMessage.js";

export const getUserChatMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId, "userId in controller");

    const messages = await ChatMessage.find({ userId }).populate("sender", "name email").sort({ createdAt: 1 });
    console.log(messages, "messages in controller");
    return res.status(200).json({  success: true, message: "Chat messages fetched successfully", messages  });
 } catch (error) {
    console.error("Error fetching chat messages:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
export const adminGetUserChatMessages = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }
    console.log( req.user,"Admin access granted");
 const { userId } = req.params;
 const messages = await ChatMessage
      .find({ userId })
      .sort({ createdAt: 1 });
 res.status(200).json({ success: true, messages });
 console.log(userId, "userId in admin controller");
} catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export const userSendMessage = async (req, res) => {
  try {
    const userId = req.user?._id; 

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }
  //  const userId = req.user._id;
    const msg = await ChatMessage.create({
      userId,
      sender: userId,
      message,
    });
      const populatedMsg = await ChatMessage.findById(msg._id).populate(
      "sender",
      "name email"
    );

    return res.status(201).json({
      success: true,
      data: msg,
      populatedMsg,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};





