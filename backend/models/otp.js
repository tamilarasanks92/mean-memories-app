import mongoose from "mongoose";

const userOTPSchema = mongoose.Schema({
    email: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expriresAt: {
        type: Date,
        default: Date.now() + 3600000
    }
})

const userOTPVerification = mongoose.model('userOTPVerification', userOTPSchema);
export default userOTPVerification;