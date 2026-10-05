import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose"
export const connectDb= async()=>{
    try{
   await mongoose.connect(process.env.INTERVIEW_MONGODB_URL || process.env.MONGODB_URL)
  console.log("Connected to MongoDB")
}catch(err){
  console.error("Error connecting to MongoDB:", err)
    }
}