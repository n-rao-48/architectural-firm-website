import mongoose from 'mongoose';

const client = process.env.DATABASE_CLIENT || 'mongodb';

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/architecture_firm';

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

export async function query() {
  throw new Error('query() is not available when DATABASE_CLIENT=mongodb');
}

export function getDbClient() {
  return client;
}

export default connectDB;
