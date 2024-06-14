"use strict";
// const mongoose=require("mongoose");
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
// async function connectDB()
// {
//     try
//     {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log('MongoDB connection established');
//     }
//     catch(err)
//     {
//         console.error("Error connecting to MongoDB",err);
//     }
// }
// module.exports=connectDB;
// import mongoose from "mongoose";
// async function connectDB(): Promise<void> {
//     try {
//         await mongoose.connect(process.env.MONGO_URL );
//         console.log('MongoDB connection established');
//     } catch (err) {
//         console.error("Error connecting to MongoDB", err);
//     }
// }
// export default connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoURL = process.env.MONGO_URL;
            if (!mongoURL) {
                throw new Error("MongoDB URL is not defined in the environment variables.");
            }
            yield mongoose_1.default.connect(mongoURL);
            console.log('MongoDB connection established');
        }
        catch (err) {
            console.error("Error connecting to MongoDB", err);
        }
    });
}
exports.default = connectDB;
