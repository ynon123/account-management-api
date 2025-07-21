import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/account-db?replicaSet=rs0&ssl=false';
        console.log(`Connecting to MongoDB at ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
