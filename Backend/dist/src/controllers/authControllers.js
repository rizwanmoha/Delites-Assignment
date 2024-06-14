"use strict";
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const authServices_1 = require("../services/authServices");
const authValidations_1 = require("../validations/authValidations");
const otpModel_1 = __importDefault(require("../models/otpModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'luckiestluck9569@gmail.com',
        pass: 'zoevzhybfphvvgwt',
    },
});
const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
const sendOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: 'luckiestluck9569@gmail.com',
            to: email,
            subject: 'Your OTP',
            text: `Your OTP is: ${otp}`,
        });
        console.log('OTP sent successfully.');
    }
    catch (error) {
        console.error('Error sending OTP:', error);
    }
});
const generateAndSendOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate OTP
        const otp = generateOTP();
        // Save OTP to the database
        const otpDocument = new otpModel_1.default({
            email,
            otpNumber: otp,
        });
        yield otpDocument.save();
        // Send OTP via email
        yield sendOTP(email, otp);
    }
    catch (error) {
        console.error('Error generating and sending OTP:', error);
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = authValidations_1.signupValidationSchema.validate(req.body);
        if (error) {
            // return res.status(400).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
            res.status(400).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
            return;
        }
        const { email } = value;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(404).send({ success: false, message: "User already exist please login" });
            return;
        }
        yield generateAndSendOTP(email);
        res.status(200).send({ success: true, message: "Email send successfully" });
        return;
        const { success, message } = yield (0, authServices_1.signupService)(value);
        if (success) {
            // return res.status(201).json({ success: true, message });
            res.status(201).json({ success: true, message });
        }
        else {
            res.status(409).json({ success: false, message });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = authValidations_1.signinValidationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ success: false, message: "Email or Password missing" });
            return;
        }
        const { success, status, message, token, user } = yield (0, authServices_1.signinService)(value);
        if (!success) {
            res.status(status).json({ success: false, message });
            return;
        }
        res.status(status).json({ success: true, token, user, message });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
