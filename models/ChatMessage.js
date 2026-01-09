// import e from "express";
import mongoose from "mongoose";
// import { ref } from "process";

const ChatMessageSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    // enum: ["user", "admin"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sendoff : {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  tradeOff : {
    type: String,
    enum: ["user", "admin"],
    required: true,
 },
 readByAdmin: {
      type: Boolean,
      default: false,
    },
    readByUser: {
      type: Boolean,
      default: false,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatMessage", ChatMessageSchema);


