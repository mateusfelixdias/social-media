import mongoose from 'mongoose';

export const connection = async () => {
  try {
    const DATABASE_URL = process.env.DATABASE_URL || '';

    mongoose.set('strictQuery', false);
    await mongoose.connect(DATABASE_URL);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
