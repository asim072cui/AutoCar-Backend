import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }, 
  location: { type: String, required: true },
  carDetails: {
    maker: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
  },
  services: { type: [String], required: true }, 
  otherService: { type: String, default: "" },
  status : {
    type :String,
    enum : ["Pending", "Confirmed", "Completed", "Cancelled"],
    default : "Pending"
  }
}, { timestamps: true
});

export default mongoose.model("Appointment", appointmentSchema);
