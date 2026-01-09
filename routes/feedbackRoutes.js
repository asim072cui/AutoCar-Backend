import express from "express";
import {
  createFeedback,
  getallFeedback,
  getsingleFedback,
  replyFeedback,
} from "../controllers/feedbackController.js";

import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// User routes
router.post("/create", createFeedback);
router.get("/:id", getsingleFedback);

// Admin routes
router.get("/all", protect, getallFeedback);
router.put("/reply/:id", protect, replyFeedback);

export default router;
