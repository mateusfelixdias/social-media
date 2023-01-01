import { Request, Response } from 'express';
import { Post } from '../../database/models/Post';

export const findFeedPost = async (request: Request, response: Response) => {
  try {
    const posts = await Post.find();

    return response.status(200).json(posts).end();
  } catch ({ message }) {
    return response.status(404).json({ error: message }).end();
  }
};
