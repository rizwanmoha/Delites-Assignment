"use strict";
// const Joi = require('joi');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidationSchema = exports.signupValidationSchema = void 0;
// const signupValidationSchema = Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     contactMode: Joi.array().items(Joi.string().valid('phone', 'email')).required()
//   });
//   const signinValidationSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required()
//   });
//   module.exports = {signupValidationSchema , signinValidationSchema};
const joi_1 = __importDefault(require("joi"));
const signupValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    // contactMode: Joi.array().items(Joi.string().valid('phone', 'email')).required()
    contactMode: joi_1.default.string().valid('phone', 'email'),
});
exports.signupValidationSchema = signupValidationSchema;
const signinValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.signinValidationSchema = signinValidationSchema;
