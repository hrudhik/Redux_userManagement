import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'


const adminlogin = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }

        const validpassword = await bcrypt.compare(user.password, password)
        if (!validpassword) {
            res.status(400).json({ message: "Invalid credantionls" })
            return
        }

        if (user.role !== "admin") {
            res.status(400).json({ message: "user role is not match" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "admin login success", user, token })
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"admin login faid"})
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const blockUnblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
    adminlogin
}