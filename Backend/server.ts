// require("dotenv").config();
// const express=require("express");
// const mongoose=require("mongoose");
// const connectDB=require("./src/config/db");
// const cors=require("cors");
// const authRoutes = require('./src/routers/authRoutes');

// const app = express();

// connectDB();

// app.use(express.json());
// app.use(cors());
// app.use('/api/v1' , authRoutes);



// const PORT=5000;
// app.listen(PORT,()=>
// {
//     console.log(`Server listening on PORT:${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db";
import cors from "cors";
import authRoutes from './src/routers/authRoutes';

const app: Express = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/v1', authRoutes);

const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
