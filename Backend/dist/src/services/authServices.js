"use strict";
// const User = require('../models/User.js');
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
exports.signinService = exports.signupService = void 0;
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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtil_1 = require("../utils/jwtUtil");
const signupService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, contactMode } = userData;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = new userModel_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactMode
        });
        yield user.save();
        return { success: true, message: "User registered successfully!" };
    }
    catch (error) {
        return { success: false, message: "Internal server error" };
    }
});
exports.signupService = signupService;
const signinService = (value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = value;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return { success: false, status: 404, message: "User not found" };
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return { success: false, status: 401, message: "Invalid credentials" };
        }
        const token = (0, jwtUtil_1.generateToken)(user);
        return { success: true, status: 200, token, user, message: "User login successfully" };
    }
    catch (error) {
        return { success: false, status: 500, message: "Internal server error" };
    }
});
exports.signinService = signinService;
