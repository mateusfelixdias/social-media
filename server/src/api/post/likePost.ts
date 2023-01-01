import { Request, Response } from 'express';
import { Post } from '../../database/models/Post';

export const likePost = async (request: Request, response: Response) => {
  try {
    const { params, body } = request;
    const { id } = params;
  
    const { isValid } = body;
    const userId = isValid.id;

    const post = await Post.findById(id);
    const likes = post?.likes.flatMap((like) => Object.entries(like));

    const isLiked = likes?.some(([key]) => key === userId);

    const updatedLikes = isLiked
      ? likes?.filter(([key]) => key !== userId)
      : [...(likes as []), { [userId]: true }];

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { likes: updatedLikes },
      { new: true }
    );

    return response.status(200).json(updatedPost).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message }).end();
  }
};
