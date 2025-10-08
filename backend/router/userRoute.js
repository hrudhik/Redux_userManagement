import express from "express";
import { SignUp, loginUser } from "../controllers/AuthController.js";

const userRoute=express.Router()

userRoute.post('/register',SignUp)
userRoute.post('/login',loginUser)

export default userRoute