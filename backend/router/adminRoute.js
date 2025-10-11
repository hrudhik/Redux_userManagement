import { Router } from "express";
import { adminlogin ,getAllUsers,addUser,updateUser,deleteUser} from "../controllers/AdminController.js";



const adminRout=Router()

adminRout.post('/login',adminlogin)
adminRout.get("/users", getAllUsers);
adminRout.post("/users", addUser);
adminRout.put("/users/:id", updateUser);
adminRout.delete("/users/:id", deleteUser);

export {
    adminRout
}