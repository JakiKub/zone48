import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    pointsAll: { type: Number, default: 48 },
    pointsNow: { type: Number, default: 48 }
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User