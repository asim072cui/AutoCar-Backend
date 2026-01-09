import express from 'express';
import { createCar,getSimilarCars, getAllcars, getcarbyId } from '../controllers/carController.js';


const router = express.Router();
router.post('/create', createCar);
router.get('/similar/:id', getSimilarCars);
router.get('/all', getAllcars); // Use ?showAll=true to get all cars including booked ones
router.get('/:id', getcarbyId);


export default router;