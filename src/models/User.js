import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    nationality: { type: String, default: "Unset" },
    pointsAll: { type: Number, default: 48 },
    pointsNow: { type: Number, default: 48 },
    verified: { type: Boolean, default: false },
    verifToken: { type: String },
    resetToken: { type: String },
    resetExpires: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User