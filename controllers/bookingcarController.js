import Booking from '../models/Booking.js';
import  Car from '../models/CarModel.js';

const PETROL_COST_PER_DAY = 500;
const TOLL_FEE_PER_RENT = 100;
const OTHER_EXPENSES_PER_BOOKING = 200;
// User can book a car for rent or buy
export const bookingCar = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const {
      carId,
      bookingType,
      rentDays,
      paymentMethod,
      userName,
      userEmail,
      userPhone,
      userMessage,
    } = req.body;

    if (!carId || !bookingType || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!userName || !userEmail || !userPhone) {
      return res.status(400).json({ message: "User contact details are required" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.isAvailable === false) {
      return res.status(400).json({ message: "Car is not available" });
    }

    let price = 0;

    if (bookingType === 'rent') {
      if (!rentDays || rentDays <= 0) {
        return res.status(400).json({ message: "Rent days must be greater than 0" });
      }
      price = car.price * rentDays;
      car.isAvailable = false;
      await car.save();
    } 
    else if (bookingType === 'buy') {
      price = car.price;
      // Mark car as unavailable when bought
      car.isAvailable = false;
      await car.save();
    } 
    else {
      return res.status(400).json({ message: "Invalid booking type" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      bookingType,
      rentDays: bookingType === 'rent' ? rentDays : 0,
      paymentMethod,
      price,
      userName,
      userEmail,
      userPhone,
      userMessage,
    });

    res.status(201).json({
      message: "Car booked successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// User can access his own bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('car');
        res.status(200).json({ message : "User bookings fetched successfully", bookings});
    } catch (error) {
        res.status(500).json({ message : "Server Error", error: error.message})
    }
}
//Admin can access this Booking to see which number are booked
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('car').populate('user', 'name email phone img price');
        res.status(200).json({ message : "All bookings fetched successfully", bookings});
    }catch (error) {
        res.status(500).json({ message : "Server Error", error: error.message})
    }
}

export const getBookingBystatusId = async (req, res) => {
    try {
      const { status } = req.body;
      if( !status ) {
        return res.status(400).json({ message : "Status is required"});
      }
      const bookings = await Booking.findById(req.params.id);

      if (!bookings){
        return res.status(404).json({ message : "Booking is not found"})
      }
      bookings.status = status;
      await bookings.save();
      res.status(200).json({ message : "Booking status updated successfully", bookings});
     }catch (error) { 
        res.status(500).json({ message : "Server Error", error: error.message})
    }
}

// export const getAdminRevenue = async (req, res) => {
//   try {
//      const bookings = await Booking.find({
//       status: { $in: ['Approved', 'Completed'] },
//     });

//     let totalRevenue = 0;
//     let rentRevenue = 0;
//     let buyRevenue = 0;

//     bookings.forEach(booking => {
//       const price = booking.price || 0;
//       let expenses = 0;

//       if (booking.bookingType === 'rent') {
//         expenses =
//           booking.rentDays * PETROL_COST_PER_DAY + TOLL_FEE_PER_RENT + OTHER_EXPENSES_PER_BOOKING;

//         const netRevenue = price - expenses;
//         rentRevenue += netRevenue > 0 ? netRevenue : 0;
//       } else if (booking.bookingType === 'buy') {
//         // Expenses for buy booking (flat)
//         expenses = OTHER_EXPENSES_PER_BOOKING; 

//         const netRevenue = price - expenses;
//         buyRevenue += netRevenue > 0 ? netRevenue : 0;
//       }
//     });

//     totalRevenue = rentRevenue + buyRevenue;

//     return res.status(200).json({
//       message: 'Revenue calculated successfully',
//       revenue: {
//         totalRevenue,
//         rentRevenue,
//         buyRevenue,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };
