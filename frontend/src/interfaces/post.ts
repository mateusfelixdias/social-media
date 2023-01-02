export interface IPost {
  _id: string;
  userId: string;
  likes: Array<{}>;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  comments: Array<string>;
  userPicturePath: string;
}
