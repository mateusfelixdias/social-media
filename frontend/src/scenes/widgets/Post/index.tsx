import { useState } from 'react';
import { api } from '../../../lib/api';
import * as Material from '@mui/material';
import { actions } from '../../../states';
import * as Icons from '@mui/icons-material';
import { themeSettings } from '../../../themes';
import { IPost } from '../../../interfaces/post';
import { Friend } from '../../../components/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../../interfaces/initialState';
import { FlexBetween } from '../../../components/FlexBetween';
import { WidgetWrapper } from '../../../components/WidgetWrapper';

const { setPost } = actions;

export const Post = (post: IPost) => {
  const [isComment, setIsCommnet] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { token, mode } = useSelector((state: InitialState) => state);
  const loggedInUserId = useSelector((state: InitialState) => state.user._id);
  const isLiked = Boolean(post.likes[~~loggedInUserId]);
  const likeConut = Object.values(post.likes).length;

  const { palette } = themeSettings(mode);
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const { data } = await api.get(`/posts/${post._id}/like`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setPost({ post: data }));
  };

  return (
    <WidgetWrapper>
      <Friend
        friendId={post.userId}
        subTitle={post.location}
        userPicturePath={post.picturePath}
        name={`${post.firstName} ${post.lastName}`}
      />

      <Material.Typography color={main} sx={{ mt: '1rem' }}>
        {post.description}
      </Material.Typography>

      {post.picturePath ? (
        <img
          alt="post"
          width="100%"
          height="auto"
          src={`${import.meta.env.VITE_API_URL}/public/assets/${
            post.picturePath
          }`}
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
        />
      ) : null}

      <FlexBetween gap="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <Material.IconButton onClick={patchLike}>
              {isLiked ? (
                <Icons.FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <Icons.FavoriteBorderOutlined />
              )}
            </Material.IconButton>
            <Material.Typography>{likeConut}</Material.Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <Material.IconButton onClick={() => setIsCommnet(!isComment)}>
              <Icons.ChatBubbleOutlineOutlined />
            </Material.IconButton>

            <Material.Typography>{post.comments.length}</Material.Typography>
          </FlexBetween>
        </FlexBetween>

        <Material.IconButton>
          <Icons.ShareOutlined />
        </Material.IconButton>
      </FlexBetween>

      {isComment ? (
        <Material.Box mt="0.5rem">
          {post.comments.map((comment, key) => {
            return (
              <Material.Box key={`${post._id}-${key}`}>
                <Material.Divider />

                <Material.Typography
                  sx={{ color: main, m: '0.5rem 0 ', pl: '1rem' }}
                >
                  {comment}
                </Material.Typography>
              </Material.Box>
            );
          })}
          <Material.Divider />
        </Material.Box>
      ) : null}
    </WidgetWrapper>
  );
};
