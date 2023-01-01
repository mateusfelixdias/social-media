import { IUser } from '../../../../../interfaces/user';
import { User } from '../../../../../database/models/User';
import { destructureFriendData } from '../destructureFriendData';

export const addFriend = async (user: IUser, friendId: string) => {
  try {
    const { _id, friends } = user;

    const friend = (await User.findById(friendId)) as IUser;

    const update = { friends: [...friends, friendId] };
    await User.findOneAndUpdate({ _id }, update);

    const friendData = destructureFriendData(friend);
    return friendData;
  } catch ({ message }) {
    throw message;
  }
};
