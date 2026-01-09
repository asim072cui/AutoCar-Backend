import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    section: { type: String,  enum: ["Rent Car", "Buy Car"],   required: true,},
    name: { type: String, required: true },
    images: [
      { type: String, required: true},
    ],
    location: { type: String, required: true },
    seats: { type: Number, required: true },
    gas: { type: String, required: true },
    transmission: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    owner: { name: String, email: String, phone: String, img: String },
    isAvailable: { type: Boolean, default: true }, // fixed spelling
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
