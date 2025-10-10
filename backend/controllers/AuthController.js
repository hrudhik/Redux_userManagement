
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser =await User.findOne({email:email})
        
        if (existingUser) {
            return res.status(400).json({ message: "User allready exists" })
        }

        const hash = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, hash)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).json({message:"User signUp success",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})

    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if(user.isBlocked)return res.status(400).json({message:"user is blocked by admin"})
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export{
  SignUp,
  loginUser
}
