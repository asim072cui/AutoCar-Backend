import ChatMessage from "../models/ChatMessage.js";

const ChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // JOIN USER ROOM
    socket.on("join_room", (userId) => {
      if (!userId) return;
      socket.join(userId);
      console.log("Joined room:", userId);
    });

    // USER SEND MESSAGE
    socket.on("send_message", async ({ userId, message }) => {
      try {
        if (!userId || !message) return;

        const msg = await ChatMessage.create({
          userId,
          sender: userId,
          message,
        });

        io.to(userId).emit("receive_message", msg);
      } catch (err) {
        console.error("Error:", err.message);
      }
    });

    // ADMIN SEND MESSAGE
    socket.on("admin_send_message", async ({ userId, message }) => {
      try {
        if (!userId || !message) return;

        const msg = await ChatMessage.create({
          userId,
          sender: userId,
          message,
        });

        io.to(userId).emit("receive_message", msg);
      } catch (err) {
        console.error("Error:", err.message);
      }
    });
  });
};

export default ChatSocket;
