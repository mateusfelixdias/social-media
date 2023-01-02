import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';

export interface InitialState {
  posts: Array<IPost>;
  user: IUser;
  token: string;
  mode: 'light' | 'dark';
}
