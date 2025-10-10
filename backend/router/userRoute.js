import express from "express";
import { SignUp, loginUser } from "../controllers/AuthController.js";
import { getProfile, updateProfile } from "../controllers/ProfileController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const userRoute=express.Router()

userRoute.post('/register',SignUp)
userRoute.post('/login',loginUser)
userRoute.get('/profile', protect,getProfile)
userRoute.put('/updateProfile',protect,upload.single("image"),updateProfile)

export default userRoute