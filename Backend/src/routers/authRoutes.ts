// const express=require("express");
// const router=express.Router();
// const {signup   , signin} = require('../contollers/authControllers');

// router.post('/signup' , signup );

// router.post('/signin' , signin);

// module.exports=router;

import express, { Router } from "express";
import { signup, signin , verifyOtp } from '../controllers/authControllers';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-otp', verifyOtp);

export default router;
