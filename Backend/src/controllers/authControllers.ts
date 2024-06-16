import { Request, Response, NextFunction } from "express";
import nodemailer from 'nodemailer';
import { signupService, signinService } from '../services/authServices';
import { signupValidationSchema, signinValidationSchema } from '../validations/authValidations';
import Otp, { IOtp } from '../models/otpModel';
import userModel from '../models/userModel';


const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
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
    
    const otp = generateOTP();

    
    const newOtp = new Otp({email , otpNumber : otp});
    await newOtp.save();

    
    await sendOTP(email, otp);
  } catch (error) {
    console.error('Error generating and sending OTP:', error);
  }
};


const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {firstName , lastName , password , contactMode , email} = req.body;
    const newObj = {firstName , lastName , password , contactMode , email};
    const { error, value } = signupValidationSchema.validate(newObj);
    if (error) {
     
      console.log(req.body);
      console.log(error);
      console.log("here is coming");
      res.status(202).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
      return;
    }
    
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      res.status(201).send({success : false , message : "User already exist please login"});
      return;
    }
    await generateAndSendOTP(email);
     res.status(200).send({success : true , message : "Email send successfully"});

     return ;

   
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = signinValidationSchema.validate(req.body);

    if (error) {
      res.status(203).json({ success: false, message: "Email is not valid" });
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

 const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    const {firstName , lastName , password , contactMode , email , otp} = req.body;
    const userDetails = {firstName , lastName , password , contactMode , email};
      
    
   
   


    const otpDocument = await Otp.findOne({ email }).sort({ time: -1 }); 
    if (!otpDocument) {
      res.status(200).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
      return;
    }

   
    if (otpDocument.otpNumber !== otp) {
      res.status(202).json({ success: false, message: 'Invalid OTP. Please try again.' });
      return;
    }

    const { success, message } = await signupService(userDetails);
    if (success) {
      
      res.status(201).json({ success: true, message });
    } else {
       res.status(409).json({ success: false, message });
    }

   } catch (error) {
    next(error);
  }
};

export { signup, signin , verifyOtp };
