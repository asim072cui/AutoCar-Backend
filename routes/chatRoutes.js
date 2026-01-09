import express from "express";
import {
  getUserChatMessages,
  adminGetUserChatMessages,
  userSendMessage,
} from "../controllers/chatController.js";
import { protect } from "../middleware/chatMiddleware.js";

const router = express.Router();

// USER: GET HIS OWN MESSAGES
router.get("/messages", protect, getUserChatMessages);

// ADMIN: GET MESSAGES OF ANY USER
router.get("/admin/messages/:userId", protect, adminGetUserChatMessages);

// SAVE MESSAGE (user or admin)
router.post("/sendmessages", protect, userSendMessage);

export default router;
