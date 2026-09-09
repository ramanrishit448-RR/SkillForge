import express from 'express'
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") })
dotenv.config()

import proxy from 'express-http-proxy'
import dns from "dns"
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { isAuth } from './middlewares/isAuth.js'
import { getCurrentUser } from './controllers/user.controller.js'
import { proxyWithUser } from './utils/proxyWithHeaders.js'
dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()


const PORT = process.env.GATEWAY_PORT || process.env.PORT || 8000
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
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req,res)=>{
    return res.send(`hello from Server`)


})
const defaultProxyErrorHandler = (serviceName) => (err, res, next) => {
  console.error(`[Gateway Proxy Error] Failed to reach ${serviceName}:`, err.message);
  return res.status(503).json({
    success: false,
    message: `${serviceName} is currently unavailable or starting up. Please try again in a few seconds.`,
    error: err.code || err.message,
  });
};

app.use(
  "/api/auth",
  proxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001", {
    proxyErrorHandler: defaultProxyErrorHandler("Auth Service"),
  })
);

app.get("/api/me", isAuth, getCurrentUser);

app.use("/api/interview", isAuth, proxyWithUser(process.env.INTERVIEW_SERVICE_URL || "http://localhost:8002", "Interview Service"));

app.use("/api/resume", isAuth, proxyWithUser(process.env.RESUME_SERVICE_URL || "http://localhost:8003", "Resume Service"));

app.use("/api/roadmap", isAuth, proxyWithUser(process.env.ROADMAP_SERVICE_URL || "http://localhost:8004", "Roadmap Service"));

app.use("/api/billing", isAuth, proxyWithUser(process.env.BILLING_SERVICE_URL || "http://localhost:8005", "Billing Service"));

app.listen(PORT,()=>{
    console.log(`Gateway Started on ${PORT}`)
   
})

