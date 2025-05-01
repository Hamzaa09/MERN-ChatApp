import mongoose from "mongoose";

export const connectDB = async () => {
    const instance = await mongoose.connect(process.env.MONGO_URL)
    console.log(instance.connection.host)
} 