import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import appointmentRoute from "./routes/appointRoutes.js";
import commentRoute from "./routes/commentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ChatSocket from "./socket/Chatsocket.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import carCommentRoutes from "./routes/carCommentRoutes.js";
import employeesRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration - Updated for production
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.vercel.app", // Add your frontend URL
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("❌ MONGODB_URI not set — please add it to your .env file");
      process.exit(1);
    }

    await connectDB();
    app.use("/api/auth", authRoutes);
    app.use("/api/auth", googleAuthRoutes);
    app.use("/api/upload", uploadRoute);
    app.use("/api/appointments", appointmentRoute);
    app.use("/api/comments", commentRoute);
    app.use("/api/admin", adminRoutes);
    app.use("/api/feedback", feedbackRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/cars", carRoutes );
    app.use("/api/bookings", bookingRoutes );
    app.use("/api/carcomments", carCommentRoutes );
    app.use("/api/employee", employeesRoutes );

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    global.io = io;

    ChatSocket(io);

    const PORT = process.env.PORT || 5000;
    
    // Only start server if not in serverless environment
    if (process.env.VERCEL !== "1") {
      httpServer.listen(PORT, () =>
        console.log(`🚀 Server running on port ${PORT}`)
      );
    }

    // Export for Vercel
    return httpServer;

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

// Start server
const serverInstance = await startServer();

// Export for Vercel
export default serverInstance;
