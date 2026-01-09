import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  },
  name: { type: String, required: true }, 
  email: { type: String },
  comment: { type: String, required: true },
  profilePic: { type: String,},
}, { timestamps: true });



export default mongoose.model("Comment", commentSchema);
