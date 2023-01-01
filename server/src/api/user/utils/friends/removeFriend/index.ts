import { IUser } from '../../../../../interfaces/user';
import { User } from '../../../../../database/models/User';
import { destructureFriendData } from '../destructureFriendData';

export const removeFriend = async (user: IUser, friendId: string) => {
  try {
    const { _id, friends } = user;
    const convertFriends = friends as [];

    const deletedUser = convertFriends.filter((id: string) => {
      id.toString() === friendId;
    }) as unknown;

    const removingAFriend = convertFriends.filter((id: string) => {
      id.toString() !== friendId;
    });

    const update = { friends: removingAFriend };
    await User.findOneAndUpdate({ _id }, update);

    const friendData = destructureFriendData(deletedUser as IUser);
    return friendData;
  } catch (err) {
    throw err;
  }
};
