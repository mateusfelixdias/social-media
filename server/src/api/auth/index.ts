import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { signSync } from '../../services/jwt';
import { IAuth } from '../../interfaces/auth';
import { User } from '../../database/models/User';

export const login = async ({ body }: Request, response: Response) => {
  try {
    const { data } = body;
    const { email, password }: IAuth = data;

    const user = await User.findOne({ email });
    if (!user) return response.status(404).end();

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return response.status(400).end();

    const token = signSync(user.id);

    return response.status(200).json({ token, user }).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message }).end();
  }
};
