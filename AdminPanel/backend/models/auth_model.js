import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    email: String,
    password: String
}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", authSchema);

// D Drive - database
// photos - collection
// movies
// code