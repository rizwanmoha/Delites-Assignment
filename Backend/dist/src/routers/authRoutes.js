"use strict";
// const express=require("express");
// const router=express.Router();
// const {signup   , signin} = require('../contollers/authControllers');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post('/signup' , signup );
// router.post('/signin' , signin);
// module.exports=router;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.post('/signup', authControllers_1.signup);
router.post('/signin', authControllers_1.signin);
router.post('/verify-otp', authControllers_1.verifyOtp);
exports.default = router;
