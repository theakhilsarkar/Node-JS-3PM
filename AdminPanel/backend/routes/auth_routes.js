import express from 'express'
import { checkLoginStatus, signin, signout, signup, verifyOtp } from '../controllers/auth_controller.js';

const auth_routes = express.Router();

auth_routes.post("/signup", signup)
auth_routes.post("/signin", signin)
auth_routes.post("/verifyOtp", verifyOtp)

auth_routes.get("/checkLoginStatus", checkLoginStatus)
auth_routes.get("/signout", signout)

export default auth_routes;

// http://localhost:5000/signin - check email,password
// http://localhost:5000/signup - user register
// http://localhost:5000/signout - logout
// http://localhost:5000/verifyotp - verify
// http://localhost:5000/checkloginstatus (token is exist in cookie or not, expire) - home,profile,contact

// google -> github -> repo -> webmaterial -> node js -> ch32
