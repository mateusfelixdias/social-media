import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    impressions: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
    viewedProfile: {
      type: Number,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
