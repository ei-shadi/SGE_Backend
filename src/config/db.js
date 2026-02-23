import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; 
  }
};

export default connectDB;