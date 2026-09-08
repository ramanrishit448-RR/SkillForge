import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      retryStrategy(times) {
        if (times > 3) {
          console.warn("[Redis] Could not connect to Redis. Retries exhausted.");
          return null; 
        }
        return Math.min(times * 500, 2000);
      }
    })
  : new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      retryStrategy(times) {
        if (times > 3) {
          console.warn("[Redis] Could not connect to Redis. Retries exhausted.");
          return null; // Stop retrying
        }
        return Math.min(times * 500, 2000);
      }
    })

redis.on("error", (err) => {
  console.error("Redis Error:", err.message)
})

export default redis