import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const AuthCollection = mongoose.model("auth", authSchema);

// populate
// we can connect two or more collection together

