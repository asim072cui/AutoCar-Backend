import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
// ref: "Car",  required: true 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car: {  type: mongoose.Schema.Types.ObjectId, ref: "Car",  required: true  },
  bookingType: {  type: String,  enum: ['rent', 'buy'], // controller ke sath match
  required: true
  },
 rentDays: {  type: Number,  default: 0 },
//  totalPrice: {  type: Number,  required: true  },
 userName: {  type: String, required: true  },
 userEmail: {  type: String,  required: true },
 userPhone: {  type: String, required: true },
 userMessage: {  type: String  },
 paymentMethod: { type: String, enum: ['Credit Card','PayPal','Cash on Delivery','Bank Transfer','EasyPaisa','JazzCash' ], required: true },
 status: { type: String,  enum: ['Pending', 'Approved', 'Cancelled', 'Completed'],  default: 'Pending' }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
