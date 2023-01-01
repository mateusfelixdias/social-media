import { Request, Response } from 'express';
import { IUser } from '../../interfaces/user';
import { hashThePassword } from './utils/hash';
import { User } from '../../database/models/User';

export const create = async (request: Request, response: Response) => {
  try {
    const { body, file } = request;
    const userData: IUser = { ...body, picturePath: file?.filename || '' };

    const hash = await hashThePassword(userData.password);

    const user = await User.create({
      ...userData,
      password: hash,
    });

    return response.status(201).json(user).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message });
  }
};
