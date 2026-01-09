import User from "../models/userModel.js";
import  user from "../models/userModel.js";
import bcrypt from "bcryptjs";
//this is used for admin are get for all user in the user side 
export const getAllUsers  = async(req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ message : "Users fetched successfully", users});

    }catch(error){
        res.status(500).json({ message : "Server error", error: error.message})
    }
};
// are get the user of seperate user by his id 
export const getUserById = async( req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            res.status(404).json({ message : "User not found"});
        }else {
            res.status(200).json({ message : "User fetched sucessfully", user});
        }

    }catch(error){
        res.status(500).json({ message : "Server error", error : error.message});
    }
};
// and also delete the user by his id
export const deleteUser = async ( req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({ message : "User is not Found"});
         }else {
            res.status(200).json({ message : "User deleted Sucessfully"});
         }

    }catch(error){
        res.status(500).json({ message : "Server error in deleting user", error : error.message});
    }
};
// and also reset the password of sepeerate user by his id
export const resetUserPassword = async ( req, res) => {
    try{
        const { id } = req.params;
        const { newPassword } = req.body;
        const hashed = await bcrypt.hash(newPassword, 10);
        const user = await User.findByIdAndUpdate(id, { password : hashed}, { new : true});
        if(!user){
            res.status(404).json( { message : "User is not found"});

        }else {
            res.status(200).json({ message : "Password reset successfully"});
        }

    }catch(error){
        res.status(500).json({ message : "Server error in resetting password", error : error.message});
    }
};
export  const getAdminStats = async ( req, res ) => {
    try{
        const userCount = await User.countDocuments({ role : "user"});
        const OTPissues = await User.countDocuments({
            otpRequestedCount : { $gt : 0},
            
        });
        const activeUsers = await User.countDocuments({
            lastLogin : { $gte : new Date ( Date.now() - 7*24*60*60*1000 )},
        });
        res.json({
            userCount,
            otpIssues: OTPissues,
            activeUsers,
        })

    } catch(error){
        res.status(500).json({ message : "Server error in fetching admin stats", error : error.message});

}
};