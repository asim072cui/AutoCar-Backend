import express from "express";
import {
    getAllUsers,
    getUserById,
    deleteUser,
    resetUserPassword,
    getAdminStats
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/users/:id", protect, getUserById);
router.delete("/users/:id", protect,  deleteUser);
router.put("/users/:id/password", protect, resetUserPassword);
router.get("/stats", protect, getAdminStats)

export default router;