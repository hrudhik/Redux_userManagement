import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'


const adminlogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const validpassword=await bcrypt.compare(password,admin.password)
    if (!validpassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, "secretkey", { expiresIn: "1h" });

    res.json({ admin, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "admin login faid" })
  }
}



// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't return passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new user
export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export {
  adminlogin
}