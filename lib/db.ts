import mongoose, { Mongoose, Connection } from 'mongoose';

type Global = typeof globalThis & {
  mongoose: {
    conn: Connection | any | null;
    promise: Promise<Mongoose> | null;
  };
};

let global: Global = globalThis as Global;

let cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
  console.log('Creating new cached');
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new connection');
    cached.promise = mongoose
      .connect(process.env.MONGO_URL as string)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
