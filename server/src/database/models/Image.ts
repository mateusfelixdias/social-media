import mongoose from 'mongoose';
import { IImage } from '../../interfaces/image';

const imageSchema = new mongoose.Schema<IImage>({
  path: {
    type: String,
    required: true,
  },
});

export const Image = mongoose.model<IImage>('Image', imageSchema);
