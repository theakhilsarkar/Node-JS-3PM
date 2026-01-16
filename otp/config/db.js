import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/otp");
        console.log("mongodb connected successfully !")
    }
    catch (err) {
        console.log("mongodb connection failed !", err)
    }
}