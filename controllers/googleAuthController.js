import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/auth/google/callback";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * Redirect user to Google OAuth consent screen
 */
export const googleAuth = async (req, res) => {
  try {
    const redirectUrl = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate Google OAuth", error: error.message });
  }
};

/**
 * Handle Google OAuth callback and exchange code for tokens
 */
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Authorization code not provided" });
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = tokenResponse.data;

    // Get user information from Google
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );

    const { email, name, picture, verified_email } = userInfoResponse.data;

    if (!verified_email) {
      return res.status(400).json({ message: "Email not verified by Google" });
    }

    // Check if user exists in database
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name,
        email,
        password: null, // Google OAuth users don't have password
        googleId: userInfoResponse.data.id,
        profilePicture: picture,
        isGoogleAuth: true,
      });
    } else {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user.googleId = userInfoResponse.data.id;
        user.isGoogleAuth = true;
        user.profilePicture = picture || user.profilePicture;
        await user.save();
      }
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Redirect to frontend with token
    res.redirect(`${FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({ name: user.name, email: user.email }))}`);
    
  } catch (error) {
    console.error("Google OAuth Error:", error.response?.data || error.message);
    res.redirect(`${FRONTEND_URL}/auth/error?message=${encodeURIComponent(error.message)}`);
  }
};

/**
 * Get Google user profile (protected route)
 */
export const getGoogleProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isGoogleAuth: user.isGoogleAuth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
