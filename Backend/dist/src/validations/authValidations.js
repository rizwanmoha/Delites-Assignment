"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidationSchema = exports.signupValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    contactMode: joi_1.default.string().valid('phone', 'email'),
});
exports.signupValidationSchema = signupValidationSchema;
const signinValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.signinValidationSchema = signinValidationSchema;
