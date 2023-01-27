import { api } from '../../lib/api';
import { actions } from '../../states';
import * as Material from '@mui/material';
import * as Icons from '@mui/icons-material';
import { FlexBetween } from '../FlexBetween';
import { themeSettings } from '../../themes';
import { useNavigate } from 'react-router-dom';
import { UserImage } from '../UserImage/UserImage';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../interfaces/initialState';

const { setFriens } = actions;

interface IFriend {
  name: string;
  subTitle: string;
  friendId: string;
  userPicturePath: string;
}

export const Friend = ({
  name,
  friendId,
  subTitle,
  userPicturePath,
}: IFriend) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: InitialState) => state.user);
  const { token, mode } = useSelector((state: InitialState) => state);
  const { friends } = useSelector((state: InitialState) => state.user);

  const { palette } = themeSettings(mode);
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;

  const isFriend = friends.find(({ _id }) => _id === friendId);

  const addOrRemoveFriend = async () => {
    const { data } = await api.patch(
      `/users/${friendId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(setFriens({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween>
        <UserImage image={userPicturePath} size={'55px'} />
        <Material.Box
          onClick={() => {
            navigate(`profile/${friendId}`);
            navigate(0);
          }}
        >
          <Material.Typography
            color={main}
            variant="h5"
            fontWeight={500}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: palette.primary.light,
              },
            }}
          >
            {name}
          </Material.Typography>
          <Material.Typography color={medium} fontSize="0.75rem">
            {subTitle}
          </Material.Typography>
        </Material.Box>
      </FlexBetween>
      <Material.IconButton
        onClick={addOrRemoveFriend}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <Icons.PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <Icons.PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </Material.IconButton>
    </FlexBetween>
  );
};
