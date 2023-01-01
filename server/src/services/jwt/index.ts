import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const expiresIn = process.env.EXPIRE_IN || '';
const jwtSecret = process.env.JWT_SECRET || '';

export const sign = (id: string, method = jwt.sign) => {
  return method({ id }, jwtSecret, { expiresIn });
};

export const signSync = (id: string) => {
  return sign(id);
};

export const verify = async (token: string) => {
  const verify = jwt.verify(token, jwtSecret);

  return verify;
};
