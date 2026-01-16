import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    otp: Number,
    email: String,
    expiry: Date
}, { timestamps: true });

export const OtpModel = mongoose.model("otps", otpSchema);