import express, { Router } from "express";
import { signup, signin , verifyOtp } from '../controllers/authControllers';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-otp', verifyOtp);

export default router;
