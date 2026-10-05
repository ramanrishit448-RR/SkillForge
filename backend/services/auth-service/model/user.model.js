import mongoose from "mongoose";

const userSchema =
new mongoose.Schema({

   clerkId: {
      type: String,
      unique: true,
      sparse: true,
   },

   firebaseUid: {
      type: String,
      default: () => "clerk_" + Math.random().toString(36).slice(2) + Date.now(),
   },

   name: String,

   email: {
      type: String,
      required: true,
      unique: true,
   },

   image: {
      type: String,
      default: "",
   },

   interviewCoin: {
      type: Number,
      default: 150,
   },

},{
   timestamps:true
});

 const User =
mongoose.model(
   "User",
   userSchema
);

export default User;