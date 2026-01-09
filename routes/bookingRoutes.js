import express from 'express';
import { bookingCar, getUserBookings, getAllBookings, getBookingBystatusId} from '../controllers/bookingcarController.js';
import { protect } from '../middleware/bookingMiddleware.js';


const router = express.Router();

router.post('/createbooking', protect, bookingCar);
router.get('/my-bookings', protect, getUserBookings);
router.put('/status/:id', getBookingBystatusId);
router.get('/all-bookings', getAllBookings); // Assuming only admin can access this
// router.get('/admin/revenue', getAdminRevenue); // Assuming only admin can access this

export default router;