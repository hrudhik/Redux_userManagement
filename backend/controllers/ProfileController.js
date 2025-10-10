import bcrypt from "bcryptjs"
import User from "../models/User.js"


const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
        res.json({ user })
    } else {
        res.status(404).json({ message: "user not found" })
    }
}
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(req.body.password, salt)
            }
            if (req.file) {
                user.profile = `/uploads/${req.file.filename}`;
            }


            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profile:updatedUser.profile
            })
        } else {
            res.status(400).json({ message: "user not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "profile updation faild" })
    }
}

export {
    getProfile,
    updateProfile
}