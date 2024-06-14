// const User = require('../models/User.js');
// const bcrypt = require("bcryptjs");

// const { generateToken } = require("../utils/jwtUtil.js");
// const signupService = async (userData) => {
//     try {
//       const { firstName,lastName,  email, password, contactMode } = userData;
  
      
//       const foundUser = await User.findOne({ email });
//       if (foundUser) {
//         return { success: false, message: "User already exists" };
//       }
  
      
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
      
//       const user = new User({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword,
//         contactMode
//       });
//       await user.save();
  
//       return { success: true, message: "User registered successfully!" };
//     } catch (error) {
//         return {success : false , message : "Internal server error"};
//     }
//   };


//   const signinService = async (value) => {
//     try {
     
      
//       const email   = value.email;
//       const password = value.password;
     
//       const user = await User.findOne({ email });
        
//       if (!user) {
//         return { success: false, status: 404, message: "User not found" };
//       }
     
     
//       const isValidPassword = await bcrypt.compare(password, user.password);
      
//       if (!isValidPassword) {
//         return { success: false, status: 401, message: "Invalid credentials" };
//       }
  
     
//       const token = generateToken(user);
      
  
//       return { success: true, status: 200, token, user , message : "User login successfully" };
//     } catch (error) {
//         return {success : false , status : 500 ,  message : "Internal server error"};
//     }
//   };


//   module.exports = {signupService , signinService};


import userModel, { User } from '../models/userModel';
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtil";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactMode: string;
}

interface SigninData {
  email: string;
  password: string;
}

interface SignupResult {
  success: boolean;
  message: string;
}

interface SigninResult {
  success: boolean;
  status: number;
  message: string;
  token?: string;
  user?: User;
}

export const signupService = async (userData: SignupData): Promise<SignupResult> => {
  try {
    const { firstName, lastName, email, password, contactMode } = userData;

    const foundUser = await userModel.findOne({ email });
    if (foundUser) {
      return { success: false, message: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactMode
    });
    await user.save();

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const signinService = async (value: SigninData): Promise<SigninResult> => {
  try {
    const { email, password } = value;

    const user = await userModel.findOne({ email });

    if (!user) {
      return { success: false, status: 404, message: "User not found" };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, status: 401, message: "Invalid credentials" };
    }

    const token = generateToken(user);

    return { success: true, status: 200, token, user, message: "User login successfully" };
  } catch (error) {
    return { success: false, status: 500, message: "Internal server error" };
  }
};

