import 'server-only';

import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * See: https://mongoosejs.com/docs/lambda.html
 */
const globalForMongoose = globalThis;

const cached = globalForMongoose.mongoose ?? { conn: null, promise: null };

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

/** True when `MONGODB_URI` is set (local dev can omit it; APIs return empty reads). */
export function isMongoConfigured() {
  return (
    typeof process.env.MONGODB_URI === 'string' &&
    process.env.MONGODB_URI.trim() !== ''
  );
}

/**
 * Connect to MongoDB once per serverless/runtime instance; reuse in dev via global cache.
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri?.trim()) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(uri, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
