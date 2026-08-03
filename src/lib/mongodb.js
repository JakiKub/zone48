import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error ('znowu .env ma wylew')

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null }

const connectDB = async () => {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
    
    return cached.conn;
}

export default connectDB