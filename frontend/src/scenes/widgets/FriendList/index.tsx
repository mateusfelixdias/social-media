import { useEffect } from 'react';
import { api } from '../../../lib/api';
import { actions } from '../../../states';
import { Box, Typography } from '@mui/material';
import { themeSettings } from '../../../themes';
import { Friend } from '../../../components/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../../interfaces/initialState';
import { WidgetWrapper } from '../../../components/WidgetWrapper';

const { setFriends } = actions;

interface IFriendList {
  userId: string;
}

export const FriendList = ({ userId }: IFriendList) => {
  const dispatch = useDispatch();

  const { token, mode } = useSelector((state: InitialState) => state);
  const { friends } = useSelector((state: InitialState) => state.user);

  const { palette } = themeSettings(mode);
  const dark = palette.neutral.dark;

  const myFriends = async () => {
    const { data } = await api.get(`/users/${userId}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    myFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={dark}
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Lista de amigos
      </Typography>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              subTitle={friend.occupation}
              userPicturePath={String(friend.picturePath)}
              name={`${friend.firstName} ${friend.lastName}`}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};
