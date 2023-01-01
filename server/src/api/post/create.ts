import { Request, Response } from 'express';
import { User } from '../../database/models/User';
import { Post } from '../../database/models/Post';

export const create = async ({ body, file }: Request, response: Response) => {
  try {
    const { userId, description } = body;
    const user = await User.findById(userId);

    await Post.create({
      userId,
      description,
      picturePath: file?.filename,
      firstName: user?.firstName,
      lastName: user?.lastName,
      location: user?.location,
      userPicturePath: user?.picturePath,
    });

    const posts = await Post.find();
    return response.status(201).json(posts).end();
  } catch ({ message }) {
    return response.status(409).json({ error: message }).end();
  }
};
