import { Request, Response } from 'express';
import { User } from '../../database/models/User';

export const showMe = async ({ params }: Request, response: Response) => {
  try {
    const { id } = params;

    const user = await User.findById(id);
    if (!user) return response.status(404).end();

    return response.status(200).json(user).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message }).end();
  }
};
