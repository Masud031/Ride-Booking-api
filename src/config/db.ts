import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB Connection Failed:', err);
    process.exit(1);
  }
};
