import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.9cytu.mongodb.net/auth-simple?retryWrites=true&w=majority`
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
