import express from 'express';
import { 
  googleAuth, 
  googleCallback, 
  getGoogleProfile 
} from '../controllers/googleAuthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initiate Google OAuth
router.get('/google', googleAuth);

// Google OAuth callback
router.get('/google/callback', googleCallback);

// Get Google user profile (protected)
router.get('/google/profile', protect, getGoogleProfile);

export default router;
