import { useSelector } from 'react-redux';
import { themeSettings } from '../../themes';
import { Box, Typography } from '@mui/material';
import { InitialState } from '../../interfaces/initialState';

export const Header = () => {
  const mode = useSelector((state: InitialState) => state.mode);

  const theme = themeSettings(mode);
  const alt = theme.palette.background.alt;

  return (
    <>
      <Box width="100%" bgcolor={alt} p="1rem 6%" textAlign="center">
        <Typography
          bgcolor={alt}
          color="primary"
          fontSize="2rem"
          fontWeight="bold"
        >
          Mídia social
        </Typography>
      </Box>
    </>
  );
};
