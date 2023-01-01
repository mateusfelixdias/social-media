import { IUser } from '../../../../../interfaces/user';
import { IFriend } from '../../../../../interfaces/friend';

export const destructureFriendData = (friend: IUser | IFriend) => {
  const { _id, firstName, lastName, location, occupation, picturePath } = friend;

  return { _id, firstName, lastName, location, occupation, picturePath };
};