import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otpNumber: string;
  time: Date;
}

const OtpSchema: Schema<IOtp> = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
    max: 50,
    unique : true
  },
  otpNumber: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, 
  },
});

const Otp = mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;
