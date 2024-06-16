
import jwt from "jsonwebtoken";
import  userModel , { User }  from "../models/userModel";


const generateToken = (user: User): string => {
    
    return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: "15d" });
};

export { generateToken };




