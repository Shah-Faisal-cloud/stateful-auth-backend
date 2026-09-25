import mongoose from "mongoose";
import env from "./env.js";

async function connectToDB() {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000
    })
    console.log('Connected to database successfully')
  } catch (error) {
    const err = error as Error
    console.error('Failed to connect to database');
    console.error(`Reason: ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }
}

export default connectToDB