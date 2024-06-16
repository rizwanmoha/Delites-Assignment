import mongoose, { Schema, model } from 'mongoose';

export interface User {
    _id?: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactMode?: string; 
}


const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactMode: { type: String, default: 'email' },
});

const userModel = model<User>('User', userSchema);

export default userModel;
