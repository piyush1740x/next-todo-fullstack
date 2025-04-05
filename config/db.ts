import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ No MongoDB URI provided');
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

export default connectDB;

