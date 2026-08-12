import mongoose from "mongoose";

let connectionPromise;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2 && connectionPromise) return connectionPromise;

  mongoose.set("sanitizeFilter", true);
  mongoose.set("strictQuery", true);
  connectionPromise = mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
    .then((connection) => {
      console.log(`MongoDB connected: ${connection.connection.host}`);
      return connection.connection;
    })
    .catch((error) => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
};
