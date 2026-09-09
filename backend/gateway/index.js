import express from 'express'
import dotenv from "dotenv"
import path from "path"
import mongoose from "mongoose"

dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") })
dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { isAuth } from './middlewares/isAuth.js'
import { getCurrentUser } from './controllers/user.controller.js'

// Import existing microservice routes directly (runs in 1 process, ~60MB RAM)
import authRouter from "../services/auth-service/routes/auth.route.js"
import interviewRouter from "../services/interview-service/routes/interview.route.js"
import resumeRouter from "../services/resume-service/routes/resume.route.js"
import roadmapRouter from "../services/roadmap-service/routes/roadmap.route.js"
import paymentRouter from "../services/billing-service/routes/billing.route.js"

const app = express()

const PORT = process.env.PORT || process.env.GATEWAY_PORT || 8000;
app.set("trust proxy", 1);
app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".onrender.com") || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// Connect to MongoDB
const connectDb = async () => {
  const mongoUrl =
    process.env.AUTH_MONGODB_URL ||
    process.env.MONGODB_URL ||
    process.env.INTERVIEW_MONGODB_URL;
  if (!mongoUrl) {
    console.warn("⚠️ No MongoDB URL provided in environment variables.");
    return;
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

// Middleware to attach user ID for microservice controllers
const attachUser = (req, res, next) => {
  if (req.user?.userId) {
    req.headers["x-user-id"] = req.user.userId;
  }
  next();
};

app.get("/", (req, res) => {
  return res.send(`hello from Server`);
});

app.get("/api/health", (req, res) => {
  return res.json({ 
    status: "ok", 
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024) 
  });
});

// Mount routes directly
app.use("/api/auth", authRouter);
app.get("/api/me", isAuth, getCurrentUser);
app.use("/api/interview", isAuth, attachUser, interviewRouter);
app.use("/api/resume", isAuth, attachUser, resumeRouter);
app.use("/api/roadmap", isAuth, attachUser, roadmapRouter);
app.use("/api/billing", isAuth, attachUser, paymentRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gateway & Unified Services started on ${PORT}`);
  connectDb();
});

export default app;
