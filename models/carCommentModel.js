import mongoose from "mongoose";

const CarcommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,  ref: "User",   required: true  },
  car : {  type: mongoose.Schema.Types.ObjectId,  ref: "Car",  required: true },
  name: { type: String, required: true }, 
  email: { type: String },
  carcomment: { type: String, required: true },
  rating : { type :Number , required: true , min: 1 , max : 5},
  profilePic: { type: String,},
}, { timestamps: true });



export default mongoose.model("CarComment", CarcommentSchema);
