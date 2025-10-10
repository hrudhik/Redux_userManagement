
import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    profile:{type:String},
    role:{type:String,default:"user"},
    isBlocked:{type:Boolean,default:false}
}) 

const User= mongoose.model("User",userSchema);
export default User