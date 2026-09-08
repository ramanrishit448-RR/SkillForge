import mongoose from "mongoose"
export const connectDb= async()=>{
    try{
   await mongoose.connect(process.env.ROADMAP_MONGODB_URL || process.env.MONGODB_URL)
  console.log("Connected to MongoDB")
}catch(err){
  console.error("Error connecting to MongoDB:", err)
    }
}