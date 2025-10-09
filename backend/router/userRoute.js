import express from "express";
import { SignUp, loginUser } from "../controllers/AuthController.js";
import { getProfile, updateProfile } from "../controllers/ProfileController.js";
import { protect } from "../middleware/auth.js";

const userRoute=express.Router()

userRoute.post('/register',SignUp)
userRoute.post('/login',loginUser)
userRoute.get('/profile', protect,getProfile)
userRoute.put('/updateProfile',protect,updateProfile)

export default userRoute