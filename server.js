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
app.use(
  cors({
    origin: "http://localhost:3000",
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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    global.io = io;

    ChatSocket(io);

    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
