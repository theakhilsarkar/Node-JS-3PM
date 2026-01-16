import {Users} from '../models/AuthModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async(req,res)=>{
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await Users.create({email,password:hashedPassword});
    res.json({message:"signup successfully !!",result});
} 

export const signin = async(req,res)=>{
   try{
     const {email,password} = req.body;
    const user = await Users.findOne({email});
    if(!user){
        res.json({message:"user not found !"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.json({message:"invalid password !"});
    }
    const token = jwt.sign({userId:user._id},"!!@#$%^&*()(",{
        expiresIn:"1h"
    });
    res.json({message:"signin successfully !",token});
   }catch(err){
    res.json({err})
   }
}


// body,param,query,header - token
export const home = (req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.json({message:"token is missing !!"});
    }
    const decoded = jwt.verify(token,"!!@#$%^&*()(");
    console.log(decoded);
    res.json({token:token});
}


