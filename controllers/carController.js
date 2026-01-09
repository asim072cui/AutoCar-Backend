// import  Car from '../models/CarModel.js';
import Car from "../models/CarModel.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import mongoose from "mongoose";

// Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).array("images", 5); // max 5 images

export const createCar = async (req, res) => {
  try {
    const { section, name, images, location, seats, gas, transmission, description, rating, reviewsCount,
      price,
      owner,
      isAvailable,
    } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const car = await Car.create({
      section,
      name,
      images, 
      location,
      seats,
      gas,
      transmission,
      description,
      rating,
      reviewsCount,
      price,
      owner,
      isAvailable: isAvailable ?? true,
    });

    res.status(201).json({ message: "Car created successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error creating car", error: error.message });
  }
};
export const getSimilarCars = async ( req ,res ) => {
   try {
     const { id } = req.params;
     const currentCar = await Car.findById(id);
     if (!currentCar) {
       return res.status(404).json({ message: "Car not found.Select Atleast One car" });
     }
  const minPrice = currentCar.price * 0.8;
const maxPrice = currentCar.price * 1.2;

    const getSimilarCars = await Car.find({
      _id: { $ne: currentCar._id },
      section: currentCar.section,
      gas: currentCar.gas,
      // location: currentCar.location,
      // price: { $gte: minPrice, $lte: maxPrice },
    }).limit(5);

    res.status(200).json({ message: "Similar cars fetched successfully", getSimilarCars })
 }catch ( error){
     res.status(500).json({ message : " Server Error", error: error.message})
   }
}
export const getAllcars = async (req, res) => {
    try{
       // Get query parameter to filter by availability
       const { showAll } = req.query;
       
       // If showAll is true, get all cars, otherwise only available ones
       const filter = showAll === 'true' ? {} : { isAvailable: true };
       
       const cars = await Car.find(filter);
       
       // Get booking status for each car
       const carsWithBookingStatus = await Promise.all(
         cars.map(async (car) => {
           const carObj = car.toObject();
           
           // Find active booking for this car
           const activeBooking = await mongoose.model('Booking').findOne({
             car: car._id,
             status: { $in: ['Pending', 'Confirmed'] }
           }).sort({ createdAt: -1 });
           
           carObj.bookingStatus = activeBooking ? {
             bookingType: activeBooking.bookingType,
             status: activeBooking.status,
             rentDays: activeBooking.rentDays,
             userName: activeBooking.userName
           } : null;
           
           return carObj;
         })
       );
       
        res.status(200).json({ message : "Cars fetched successfully", cars: carsWithBookingStatus});

    }catch(error){
        res.status(500).json({ message : "Server Error", error: error.message})
    }
}
export const getcarbyId = async ( req, res) => {
    try{
        const car = await Car.findById(req.params.id);
        res.status(200).json({ message : "Car fetched successfully", car});

    }catch(error){
        console.log("Error fetching car by ID:", error);
        res.status(500).json({ message : "Server Error", error: error.message})
    }
}

