import express from 'express';
import { createcomment, getcomment } from '../controllers/commentController.js';
import { protect } from '../middleware/commentMiddleware.js';

const router = express.Router();
router.post('/createcomment', protect, createcomment);
router.get('/getcomments', getcomment);

export default router;
