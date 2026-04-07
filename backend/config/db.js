import mongoose from 'mongoose';

const client = process.env.DATABASE_CLIENT || 'mongodb';

function getMongoUri() {
  return (
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    ''
  ).trim();
}

function assertValidMongoUri(mongoUri) {
  if (!mongoUri) {
    throw new Error(
      'Missing MongoDB URI. Set one of: MONGO_URI, MONGODB_URI, DATABASE_URL',
    );
  }

  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    throw new Error('MongoDB URI must start with mongodb:// or mongodb+srv://');
  }

  if (mongoUri.includes('mailto:') || mongoUri.includes('%[')) {
    throw new Error(
      'MongoDB URI appears malformed (possibly copied from markdown/email format). Use a plain URI string.',
    );
  }
}

async function connectDB() {
  const mongoUri = getMongoUri();

  try {
    assertValidMongoUri(mongoUri);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error('Reason:', error?.message || error);
    throw error;
  }
}

export async function query() {
  throw new Error('query() is not available when DATABASE_CLIENT=mongodb');
}

export function getDbClient() {
  return client;
}

export default connectDB;
