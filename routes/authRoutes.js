import express from 'express';
import {
  signup, 
  login, 
  forgetPassword, 
  verifyOtp, 
  getProfile,
  previewOtpEmail,
  previewWelcomeEmail,
  previewPasswordResetSuccessEmail
} from '../controllers/authControlle.js';
import {protect } from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.post('/request-password-reset', forgetPassword);
router.post('/reset-password', verifyOtp);
router.get('/profile' , protect ,  getProfile );

// Email preview routes (for testing)
router.get('/preview-otp-email', previewOtpEmail);
router.get('/preview-welcome-email', previewWelcomeEmail);
router.get('/preview-success-email', previewPasswordResetSuccessEmail);

export default router;