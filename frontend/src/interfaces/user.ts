import { IFriend } from './friend';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  password: string;
  occupation: string;
  picturePath: string;
  impressions: number;
  viewedProfile: number;
  friends: Array<IFriend>;
}
