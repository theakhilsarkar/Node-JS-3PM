import { Auth } from '../models/AuthModels.js'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const result = await Auth.create({ email, password: hashed });
        res.json({ message: "user registered !", result });
    }
    catch (err) {
        res.json({ message: "user not registered !" });
    }
}
export const signin = (req, res) => {
    res.json({ message: "signin successfull !!", user: req.user });
}
export const signout = (req, res) => {
    req.logout(() => {
        res.json({ message: "signout successfull !!" });
    });
}
export const home = (req, res) => {
    res.json({ message: "home page accessed !", user: req.user })
}

// variable
// array
// obj
// function