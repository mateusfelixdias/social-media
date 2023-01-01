import { Request, Response } from 'express';
import { IUser } from '../../interfaces/user';
import { User } from '../../database/models/User';
import { addFriend } from './utils/friends/addFriend';
import { removeFriend } from './utils/friends/removeFriend';

export const addOrRemoveFriend = async (
  request: Request,
  response: Response
) => {
  try {
    const { body } = request;
    const { isValid: { id } } = body;
    const { friendId } = request.params;

    const user = (await User.findById(id)) as IUser;

    const myFriend = await User.findById(friendId);
    if (!myFriend) return response.sendStatus(404);

    const { friends } = user;
    const convertFriends = friends as [];

    const alreadyMyFriend = convertFriends.filter(
      (id: string) => id.toString() === friendId
    );

    if (!alreadyMyFriend.length) {
      const friend = await addFriend(user, friendId);

      return response.status(200).json(friend).end();
    }

    const friend = await removeFriend(user, friendId);
    return response.status(200).json(friend).end();
  } catch ({ message }) {
    return response.status(500).json({ error: message }).end();
  }
};
