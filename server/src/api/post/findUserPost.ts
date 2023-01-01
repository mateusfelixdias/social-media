import { Request, Response } from 'express';
import { Post } from '../../database/models/Post';

export const findUserPost = async ({ params }: Request, response: Response) => {
  try {
    const { userId } = params;

    const post = await Post.findById(userId);

    return response.status(200).json(post).end();
  } catch ({ message }) {
    return response.status(404).json({ error: message }).end();
  }
};
