import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    token:String
},{timestamps:true});

export const Users = mongoose.model("users",userSchema);