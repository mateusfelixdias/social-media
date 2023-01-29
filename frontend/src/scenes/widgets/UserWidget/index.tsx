import { api } from '../../../lib/api';
import { useSelector } from 'react-redux';
import * as Material from '@mui/material';
import { useEffect, useState } from 'react';
import * as Icons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { themeSettings } from '../../../themes';
import { IUser } from '../../../interfaces/user';
import { FlexBetween } from '../../../components/FlexBetween';
import { InitialState } from '../../../interfaces/initialState';
import { WidgetWrapper } from '../../../components/WidgetWrapper';
import { UserImage } from '../../../components/UserImage/UserImage';

interface IUserWidget {
  userId: string;
  picturePath: string;
}

export const UserWidget = ({ userId, picturePath }: IUserWidget) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const { mode, token } = useSelector((state: InitialState) => state);
  const { palette } = themeSettings(mode);

  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const { data, status } = await api.get(`/users/me/${userId}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    console.log(data, status);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Material.Box>
            <Material.Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': { color: palette.neutral.light },
                cursor: 'pointer',
              }}
            >
              {user.firstName} {user.lastName}
            </Material.Typography>

            <Material.Typography color={medium}>
              {user.friends?.length} Amigos
            </Material.Typography>
          </Material.Box>
        </FlexBetween>
        <Icons.ManageAccountsOutlined
          sx={{
            '&:hover': { color: palette.neutral.light },
            cursor: 'pointer',
          }}
        />
      </FlexBetween>

      <Material.Divider />

      <Material.Box p="1rem 0">
        <Material.Box gap="1rem" mb="0.5rem" display="flex" alignItems="center">
          <Icons.LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Material.Typography color={medium}>
            {user.location}
          </Material.Typography>
        </Material.Box>

        <Material.Box gap="1rem" display="flex" alignItems="center">
          <Icons.WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Material.Typography color={medium}>
            {user.occupation}
          </Material.Typography>
        </Material.Box>
      </Material.Box>

      <Material.Divider />

      <Material.Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Material.Typography color={medium}>
            Quem viu seu perfil
          </Material.Typography>
          <Material.Typography fontWeight="500">
            {user.viewedProfile}
          </Material.Typography>
        </FlexBetween>
        <FlexBetween>
          <Material.Typography color={medium}>
            Impressões da sua publicação
          </Material.Typography>
          <Material.Typography fontWeight="500">
            {user.impressions}
          </Material.Typography>
        </FlexBetween>
      </Material.Box>

      <Material.Box p="1rem 0">
        <Material.Typography
          mb="1rem"
          color={main}
          fontSize="1rem"
          fontWeight="31.3rem"
        >
          Perfis Sociais
        </Material.Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              alt="twitter"
              src={`${import.meta.env.VITE_API_URL}/public/assets/twitter.png`}
            />
            <Material.Box>
              <Material.Typography color={main} fontWeight="31.3rem">
                Twitter
              </Material.Typography>
              <Material.Typography color={medium}>
                Rede social
              </Material.Typography>
            </Material.Box>
          </FlexBetween>
          <Icons.EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img
              alt="linkedin"
              src={`${import.meta.env.VITE_API_URL}/public/assets/linkedin.png`}
            />
            <Material.Box>
              <Material.Typography color={main} fontWeight="31.3rem">
                Linkedin
              </Material.Typography>
              <Material.Typography color={medium}>
                Rede social
              </Material.Typography>
            </Material.Box>
          </FlexBetween>
          <Icons.EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Material.Box>
    </WidgetWrapper>
  );
};
