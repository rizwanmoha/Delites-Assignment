// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// const {signupService , signinService} = require('../services/authServices.js');
// const {signupValidationSchema , signinValidationSchema} = require('../validations/authValidations.js');

// const signup = async (req, res, next) => {
//     try {
//       const { error, value } = signupValidationSchema.validate(req.body);
//       if (error) {
//         return res.status(400).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
//       }
  
//       const { success, message } = await signupService(value);
//       if (success) {
//         return res.status(201).json({ success: true, message });
//       } else {
//         return res.status(409).json({ success: false, message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };



// const signin = async (req, res, next) => {
//     try {
//       const { error, value } = signinValidationSchema.validate(req.body);
  
//       if (error) {
//         return res.status(400).json({ success: false, message: "Email or Password missing" });
//       }
        
        
//       const { success, status, message, token,  user } = await signinService(value);
      
//       if (!success) {
//         return res.status(status).json({ success: false, message });
//       }
      
  
//       return res.status(status).json({ success: true, token,  user , message });
//     } catch (error) {
//       next(error);
//     }
//   };



// module.exports  = {
//     signup,
//     signin,
// }

import { Request, Response, NextFunction } from "express";
import nodemailer from 'nodemailer';
import { signupService, signinService } from '../services/authServices';
import { signupValidationSchema, signinValidationSchema } from '../validations/authValidations';
import Otp, { IOtp } from '../models/otpModel';
import userModel from '../models/userModel';


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'luckiestluck9569@gmail.com', 
    pass: 'zoevzhybfphvvgwt', 
  },
});


const generateOTP = (): string => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendOTP = async (email: string, otp: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: 'luckiestluck9569@gmail.com',
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`,
    });
    console.log('OTP sent successfully.');
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const generateAndSendOTP = async (email: string): Promise<void> => {
  try {
    // Generate OTP
    const otp = generateOTP();

    // Save OTP to the database
    const otpDocument: IOtp = new Otp({
      email,
      otpNumber: otp,
    });
    await otpDocument.save();

    // Send OTP via email
    await sendOTP(email, otp);
  } catch (error) {
    console.error('Error generating and sending OTP:', error);
  }
};


const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = signupValidationSchema.validate(req.body);
    if (error) {
      // return res.status(400).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
      res.status(400).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
      return;
    }
    const {email} = value;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      res.status(404).send({success : false , message : "User already exist please login"});
      return;
    }
    await generateAndSendOTP(email);
     res.status(200).send({success : true , message : "Email send successfully"});

     return

    const { success, message } = await signupService(value);
    if (success) {
      // return res.status(201).json({ success: true, message });
      res.status(201).json({ success: true, message });
    } else {
       res.status(409).json({ success: false, message });
    }
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = signinValidationSchema.validate(req.body);

    if (error) {
      res.status(400).json({ success: false, message: "Email or Password missing" });
      return
    }

    const { success, status, message, token, user } = await signinService(value);

    if (!success) {
       res.status(status).json({ success: false, message });
       return
    }

     res.status(status).json({ success: true, token, user, message });
  } catch (error) {
    next(error);
  }
};

// export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { email, otp } = req.body;
//       const existingOtp = await Otp.findOne({email : email});
//       if(!existingOtp){
//         res.status(400).send({success : false , message : "Otp expired"});
//         return ;
//       }
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
//       return;
//     }

//     // Check if the user exists
//     const existingUser = await userModel.findOne({ email });
//     if (!existingUser) {
//       res.status(404).json({ success: false, message: 'User not found. Please sign up first.' });
//       return;
//     }

//     // Fetch OTP document from the database
//     const otpDocument = await otp.findOne({ email }).sort({ time: -1 }); // Assuming you store the latest OTP document
//     if (!otpDocument) {
//       res.status(404).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
//       return;
//     }

//     // Verify OTP
//     if (otpDocument.otpNumber !== otp) {
//       res.status(401).json({ success: false, message: 'Invalid OTP. Please try again.' });
//       return;
//     }

//     // OTP verification successful, proceed with sign-up process
//     // You can call the sign-up service here if needed

//     res.status(200).json({ success: true, message: 'OTP verified successfully. You can proceed with sign-up.' });

//   } catch (error) {
//     next(error);
//   }
// };

export { signup, signin };
