"use strict";
// import mongoose, { Document, Model } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
// interface UserDocument extends Document {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     contactMode: string;
// }
// const userSchema = new mongoose.Schema<UserDocument>({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     contactMode: {
//         type: String,
//         default: 'email'
//     }
// },
// {
//     indexes: [
//         { email: 1 }
//     ]
// });
// const User: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);
// export default User;
// import mongoose, { Document, Model } from "mongoose";
// interface UserDocument extends Document {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     contactMode: string;
// }
// const userSchemaOptions = {
//     indexes: [{ email: 1 }]
// };
// const userSchema = new mongoose.Schema<UserDocument>({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     contactMode: {
//         type: String,
//         default: 'email'
//     }
// }, userSchemaOptions);
// const User: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);
// export default User;
// import mongoose, { Document, Model, Schema, SchemaOptions } from "mongoose";
// interface UserDocument extends Document {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     contactMode: string;
// }
// const userSchemaOptions: SchemaOptions = {
//     indexes: [{ email: 1 }]
// };
// const userSchema: Schema<UserDocument> = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     contactMode: {
//         type: String,
//         default: 'email'
//     }
// }, userSchemaOptions);
// const User: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);
// export default User;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactMode: { type: String, default: 'email' },
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
// import { Schema, model, Document } from 'mongoose';
// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   contactMode?: string; 
// }
// interface UserDocument extends User, Document {}
// const userSchema = new Schema<User>({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   contactMode: { type: String, default: 'email' },
// });
// const UserModel = model<UserDocument>('User', userSchema);
// export default UserModel;
