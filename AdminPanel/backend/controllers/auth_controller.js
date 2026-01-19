import { AuthCollection } from '../models/auth_model.js'
import bcrypt from 'bcrypt'
import { sendOTP } from '../services/otp_services.js';
import { OtpCollection } from '../models/otp_model.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.create({ email, password: hashed });
        res.json({ status: true, message: "user registered !" });
    } catch (err) {
        res.json({ status: false, message: "user registeration failed !" });
    }
}
export const signin = async (req, res) => {
    // check availibity
    const { email, password } = req.body;
    const user = await AuthCollection.findOne({ email });
    if (!user) {
        return res.json({ status: false, message: "User not found! Registere First !" })
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ status: false, message: "Incorrect Passoword !" });
    }
    // send otp
    const status = await sendOTP(email);

    res.json(status);

} // set auto login to prevent everytime login
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    // match otp
    const record = await OtpCollection.findOne({ email, otp })//{email,otp,expiry}
    if (!record) {
        return res.json({ status: false, message: "OTP is incorrect !" })
    }
    // check expiry
    // 4:02(expiry) < 4:15(current time)
    if (record.expiry < new Date(Date.now())) {
        return res.json({ status: false, message: "OTP is expired !" })
    }


    try {
        const user = await AuthCollection.findOne({ email });
        // generate jwt and store in cookie - currently login
        const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
            expiresIn: 1000 * 60 * 60
        });
        res.cookie("auth_token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        await OtpCollection.deleteMany({ email });
        res.json({ status: true, message: "OTP Verified & Signin successfully !" })
    } catch (err) {
        res.json({ status: false, message: "OTP verification failed", err: err.message });
    }
}

export const signout = (req, res) => {
    res.clearCookie("auth_token");
    res.json({ status: true, message: "Signout successfully !!" });
} // cookie clear

export const checkLoginStatus = (req, res) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.json({ status: false, message: "Signin First !" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: "1h" })
        return res.json({ status: true, message: "Already Logged In", user: decoded.payload })
    } catch (err) {
        return res.json({ status: false, message: "Logged out, Login First !", err })
    }
}

// {email:"admin@gmail.com"} -> 121edsbnhh5t34r321wqdesfvgt5t34r3dw
// decode ->  {email:"admin@gmail.com"} 



// signup
// signin
// otp verify
// home


// change password
// forget password