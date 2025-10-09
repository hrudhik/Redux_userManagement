import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res,next) => {
    let token
    if (req.headers.authorization) {
        try {
            token=req.headers.authorization
            let decode=jwt.verify(token,process.env.JWT_SECRET)            
            req.user=await User.findById(decode.id).select("-password")
            next()
        } catch (error) {
            res.status(401).json({message:"Not authorized, token failed"})
        }
    }
    if(!token)res.status(401).json({message:"Not authorized,please login"})

}

export {protect}

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization ) {
//     try {
//       token = req.headers.authorization;
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

