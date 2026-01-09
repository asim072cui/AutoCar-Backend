import express from 'express';
import { createcommentforcar, getcommentforcar } from '../controllers/carcommentController.js';
import { protect } from '../middleware/commentMiddleware.js';

const router = express.Router();
router.post('/createcomment', protect, createcommentforcar);
router.get('/:carId', getcommentforcar);

export default router;
