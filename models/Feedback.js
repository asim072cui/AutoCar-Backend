import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema({
    name : {  type :String, required : true, },
    number : {  type :String,  required : true, },
    comment : {  type :String,
        required : true,
     },

      // Admin reply section
    adminReply: { type: String, default: "" },
    repliedBy: { type: String, default: "" }, 
    isReplied: { type: Boolean, default: false },

},
 { timestamps: true}
);
export default mongoose.model("Feedback", FeedbackSchema);
