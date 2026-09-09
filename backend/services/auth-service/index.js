import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") });
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/db.js";
import dns from 'dns'
import authRouter from "./routes/auth.route.js";

dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])

const app = express();
app.set("trust proxy", 1);

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.AUTH_PORT || 8001;

app.use("/",authRouter);



process.on("uncaughtException", (err) => {
  console.error("[Auth Service Uncaught Exception]:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[Auth Service Unhandled Rejection]:", reason);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Auth Service Running on port ${PORT}`);
    connectDb();
});