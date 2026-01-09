import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { 
  createOtpEmailTemplate, 
  createWelcomeEmailTemplate,
  createPasswordResetSuccessTemplate 
} from "../utils/emailTemplates.js";

dotenv.config();

// Email Configuration and Sending
const sendEmail = async (email, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODE_MAILER_SERVICE,
    host: process.env.NODE_MAILER_HOST,
    port: process.env.NODE_MAILER_PORT,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS
    }
  });

  await transporter.sendMail({
    from: `"Auto Car" <${process.env.NODE_MAILER_USER}>`,
    to: email,
    subject,
    text,
    html: html || text,
  });
};


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body,"uyyyyyy");
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });


       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

  res.status(201).json({
  message: "User registered successfully",
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token,
});
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User trying to login:", user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  res.json({
  message: "Login successful",
  user: {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  },
  token
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min
    user.otpRequestedCount = (user.otpRequestedCount || 0) + 1;
    await user.save();

    const htmlTemplate = createOtpEmailTemplate(otp, user.name);
    await sendEmail(
      email, 
      "🔐 Password Reset OTP - Auto Car", 
      `Your OTP is ${otp}. This code will expire in 10 minutes.`,
      htmlTemplate
    );

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send password reset success email
    try {
      const successEmailHtml = createPasswordResetSuccessTemplate(user.name);
      await sendEmail(
        email,
        "✅ Password Reset Successful - Auto Car",
        "Your password has been successfully reset.",
        successEmailHtml
      );
    } catch (emailError) {
      console.error("Failed to send success email:", emailError.message);
      // Don't fail the request if email fails
    }

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// Email Preview Routes (for testing)
export const previewOtpEmail = (req, res) => {
  const otp = "123456";
  const userName = "John Doe";
  const html = createOtpEmailTemplate(otp, userName);
  res.send(html);
};

export const previewWelcomeEmail = (req, res) => {
  const userName = "John Doe";
  const html = createWelcomeEmailTemplate(userName);
  res.send(html);
};

export const previewPasswordResetSuccessEmail = (req, res) => {
  const userName = "John Doe";
  const html = createPasswordResetSuccessTemplate(userName);
  res.send(html);
};
