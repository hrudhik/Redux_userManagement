import { Router } from "express";
import { adminlogin } from "../controllers/AdminController.js";



const adminRout=Router()

adminRout.post('/admin/login',adminlogin)

export {
    adminRout
}