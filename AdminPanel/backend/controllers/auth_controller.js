import { AuthCollection } from '../models/auth_model.js'
import bcrypt from 'bcrypt'
import { sendOTP } from '../services/otp_services.js';

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

    if (status) {
        res.json({ status: true, message: "OTP Sent successfully !!" });
    } else {
        res.json({ status: false, message: "OTP cant sent !!" });
    }

} // set auto login to prevent everytime login
export const verifyOtp = (req, res) => {
    // match otp
    // generate jwt and store in cookie
    // status true
}
export const signout = (req, res) => { } // cookie clear