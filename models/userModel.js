import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {  type: String,  required: true, },

        email: { type: String, required: true, unique: true, },

        password: { type: String,  required: false,  }, // Optional for Google OAuth users

           profilePic: {
           type: String, // store image URL (cloudinary, local path, etc.)
          },

        otp: { type: String,    },

        lastLogin : { type : Date},
        otpRequestedCount : { type : Number, default : 0 },
        // use otpExpires (matching controller) for consistency
        otpExpires: {    type: Date,  },

          role: {
          type: String,
          enum: ["user", "admin"],
          default: "user",
  },
// }, { timestamps: true },

        // Google OAuth fields
        googleId: { type: String, unique: true, sparse: true },
        // profilePicture: { type: String },
        isGoogleAuth: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;