import { Post } from '../Post';
import { useEffect } from 'react';
import { api } from '../../../lib/api';
import { actions } from '../../../states';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../../interfaces/initialState';

const { setPosts } = actions;

interface IPosts {
  userId: string;
  isProfile?: boolean;
}

export const Posts = ({ userId, isProfile = false }: IPosts) => {
  const dispatch = useDispatch();
  const { posts, token } = useSelector(({ posts, token }: InitialState) => {
    return { posts, token };
  });

  const allPosts = async () => {
    const { data } = await api.get('/posts', {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setPosts({ posts: data }));
  };

  const myPosts = async () => {
    const { data } = await api.get(`/posts/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      myPosts();
      return;
    }

    allPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        return <Post {...post} key={post._id} />;
      })}
    </>
  );
};
