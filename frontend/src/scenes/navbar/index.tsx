import { useState } from 'react';
import { actions } from '../../states';
import * as Material from '@mui/material';
import * as Icons from '@mui/icons-material';
import { themeSettings } from '../../themes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FlexBetween } from '../../components/FlexBetween';
import { InitialState } from '../../interfaces/initialState';

const { setMode, setLogout } = actions;

export const Navbar = () => {
  const [isMobileMenuToggled, setIMobileMenuToggled] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: InitialState) => state.user);
  const mode = useSelector((state: InitialState) => state.mode);
  const isNonMobileScreens = Material.useMediaQuery('(min-width: 1000px)');

  const theme = themeSettings(mode);
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const fullName = `${user.firstName} ${user.lastName}`;
  const primaryLight = theme.palette.background.default;

  return (
    <FlexBetween padding="1rem 6%" bgcolor={alt}>
      <FlexBetween gap="1.75rem">
        <Material.Typography
          color="primary"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.5rem)"
          onClick={() => navigate('/home')}
          sx={{ '&:hover': { color: primaryLight, cursor: 'pointer' } }}
        >
          Mídia social
        </Material.Typography>
        {!isMobileMenuToggled ? (
          <FlexBetween
            gap="3rem"
            borderRadius="9px"
            bgcolor={neutralLight}
            padding="0.1rem 1.5rem"
          >
            <Material.InputBase placeholder="Pesquisar..." />

            <Material.IconButton>
              <Icons.Search />
            </Material.IconButton>
          </FlexBetween>
        ) : null}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <Material.IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <Icons.DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <Icons.LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </Material.IconButton>

          <Icons.Message sx={{ fontSize: '25px' }} />
          <Icons.Notifications sx={{ fontSize: '25px' }} />
          <Icons.Help sx={{ fontSize: '25px' }} />
          <Material.FormControl variant="standard">
            <Material.Select
              value={user.firstName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
            >
              <Material.MenuItem value={fullName}>
                <Material.Typography>{fullName}</Material.Typography>
              </Material.MenuItem>
              <Material.MenuItem onClick={() => setLogout()}>
                Sair
              </Material.MenuItem>
            </Material.Select>
          </Material.FormControl>
        </FlexBetween>
      ) : (
        <Material.IconButton
          onClick={() => setIMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Icons.Menu />
        </Material.IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled ? (
        <Material.Box
          right="0"
          bottom="0"
          zIndex="10"
          height="100%"
          minWidth="300px"
          maxWidth="500px"
          position="fixed"
          bgcolor={background}
        >
          <Material.Box p="1rem" display="flex" justifyContent="flex-end">
            <Material.IconButton
              onClick={() => setIMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Icons.Close />
            </Material.IconButton>
          </Material.Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <Material.IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {theme.palette.mode === 'dark' ? (
                <Icons.DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <Icons.LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </Material.IconButton>

            <Icons.Message sx={{ fontSize: '25px' }} />
            <Icons.Notifications sx={{ fontSize: '25px' }} />
            <Icons.Help sx={{ fontSize: '25px' }} />
            <Material.FormControl variant="standard">
              <Material.Select
                value={user.firstName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
              >
                <Material.MenuItem value={fullName}>
                  <Material.Typography>{fullName}</Material.Typography>
                </Material.MenuItem>
                <Material.MenuItem onClick={() => setLogout()}>
                  Sair
                </Material.MenuItem>
              </Material.Select>
            </Material.FormControl>
          </FlexBetween>
        </Material.Box>
      ) : null}
    </FlexBetween>
  );
};
