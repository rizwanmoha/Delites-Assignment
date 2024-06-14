"use strict";
// require("dotenv").config();
// const express=require("express");
// const mongoose=require("mongoose");
// const connectDB=require("./src/config/db");
// const cors=require("cors");
// const authRoutes = require('./src/routers/authRoutes');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/config/db"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./src/routers/authRoutes"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', authRoutes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
