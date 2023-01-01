import { Request, Response } from 'express';
import { User } from '../../database/models/User';
import { destructureFriendData } from './utils/friends/destructureFriendData';

export const findserFriends = async (request: Request, response: Response) => {
  try {
    const { params } = request;
    const { id } = params;

    const user = await User.findById(id);
    if (!user) return response.sendStatus(404);

    const { friends } = await user.populate('friends');
    const friendsData = friends.map((friend) => {
      return destructureFriendData(friend);
    });

    return response.status(200).json(friendsData).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message }).end();
  }
};
