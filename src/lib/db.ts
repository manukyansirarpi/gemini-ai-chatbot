import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected.");
    return;
  }

  const DB_URI: string = process.env.MONGODB_URI!;

  console.log("Connecting to MongoDB");

  await mongoose.connect(DB_URI).then(() => {
    console.log("Connected to MongoDB");
  });
};

export default connectDB;
