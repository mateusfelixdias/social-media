import { Schema } from 'mongoose';

export interface IPost {
  userId: Schema.Types.ObjectId;
  likes: Array<{}>;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  comments: Array<string>;
  userPicturePath: string;
}
