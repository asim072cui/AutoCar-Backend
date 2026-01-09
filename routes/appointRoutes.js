import express from 'express';
import { createAppointment , getAppointment , approveAppointment, completeAppointment ,cancelAppointment    } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/create', createAppointment);
router.get('/getappointments', getAppointment);
router.put("/approve/:id", approveAppointment);
router.put("/complete/:id", completeAppointment);
router.put("/cancel/:id", cancelAppointment);

export default router;