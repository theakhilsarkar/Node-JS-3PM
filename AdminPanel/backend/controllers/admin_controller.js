import { UserCollection } from '../models/user_model.js'

// export const addUser = async (req, res) => {
//     // const { email, name, phone, address, education, age, exp } = req.body;
//     try {
//         await UserCollection.create(req.body);
//         return res.json({ status: true, message: "user added successfully !" })
//     } catch (err) {
//         return res.json({ status: false, message: err.message });
//     }
// }

export const updateUser = async (req, res) => {
    const { email } = req.body;
    try {
        await UserCollection.updateOne({ email }, { $set: req.body });
        return res.json({ status: true, message: "user updated successfully !" })
    } catch (err) {
        return res.json({ status: false, message: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserCollection.find();
        return res.json({ status: true, message: "all users fetched succssfully !", users });
    } catch (err) {
        return res.json({ status: false, message: err })
    }
}

