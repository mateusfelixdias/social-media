import mongoose, { Schema } from 'mongoose';
import { IPost } from '../../interfaces/post';

const postSchema = new mongoose.Schema<IPost>(
  {
    comments: {
      type: [String],
      default: [],
    },
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
    description: {
      type: String,
    },
    userPicturePath: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: {
      type: [],
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>('Post', postSchema);
