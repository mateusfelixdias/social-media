import { IUser } from '../interfaces/user';
import { IPost } from '../interfaces/post';
import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../interfaces/initialState';

const initialState: InitialState = {
  posts: [] as unknown as Array<IPost>,
  user: {} as IUser,
  token: '',
  mode: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFriens: (state, action) => {
      if (!state.user) {
        console.error('O usuário não encontrado!');
        return;
      }

      state.user.friends = action.payload.friends;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = {} as IUser;
      state.token = '';
    },
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const post_id = action.payload.post_id;

      const updatedPost = state.posts.map((post) => {
        if (post._id === post_id) return action.payload.post;

        return post;
      });

      state.posts = updatedPost;
    },
  },
});

const { actions, reducer } = authSlice;

export { actions, reducer };
