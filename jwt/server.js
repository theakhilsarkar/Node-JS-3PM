import express from 'express'
import router from './routes/AuthRoutes.js';
import { connectDB } from './config/db.js';


const app = express();
connectDB();
app.use(express.json());
app.use("/",router);
app.listen(4000,()=>console.log("server started !"));


// auth
// cookies
// jwt
// passport js - module

// strategy --> function