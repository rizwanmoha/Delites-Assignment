"use strict";
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
exports.verifyOtp = exports.signin = exports.signup = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const authServices_1 = require("../services/authServices");
const authValidations_1 = require("../validations/authValidations");
const otpModel_1 = __importDefault(require("../models/otpModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const transporter = nodemailer_1.default.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
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
        const otp = generateOTP();
        const newOtp = new otpModel_1.default({ email, otpNumber: otp });
        yield newOtp.save();
        yield sendOTP(email, otp);
    }
    catch (error) {
        console.error('Error generating and sending OTP:', error);
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, contactMode, email } = req.body;
        const newObj = { firstName, lastName, password, contactMode, email };
        const { error, value } = authValidations_1.signupValidationSchema.validate(newObj);
        if (error) {
            console.log(req.body);
            console.log(error);
            console.log("here is coming");
            res.status(202).json({ success: false, message: 'Validation Failed', error: error.details[0].message });
            return;
        }
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(201).send({ success: false, message: "User already exist please login" });
            return;
        }
        yield generateAndSendOTP(email);
        res.status(200).send({ success: true, message: "Email send successfully" });
        return;
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
            res.status(203).json({ success: false, message: "Email is not valid" });
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
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, contactMode, email, otp } = req.body;
        const userDetails = { firstName, lastName, password, contactMode, email };
        const otpDocument = yield otpModel_1.default.findOne({ email }).sort({ time: -1 });
        if (!otpDocument) {
            res.status(200).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
            return;
        }
        if (otpDocument.otpNumber !== otp) {
            res.status(202).json({ success: false, message: 'Invalid OTP. Please try again.' });
            return;
        }
        const { success, message } = yield (0, authServices_1.signupService)(userDetails);
        if (success) {
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
exports.verifyOtp = verifyOtp;
