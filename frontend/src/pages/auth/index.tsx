import { Form } from './steps/Form';
import { useSelector } from 'react-redux';
import { themeSettings } from '../../themes';
import { InitialState } from '../../interfaces/initialState';
import { Box, Typography, useMediaQuery } from '@mui/material';

export const Auth = () => {
  const isNonMobileScreens = useMediaQuery('min-width: 1000px');
  const mode = useSelector((state: InitialState) => state.mode);

  const theme = themeSettings(mode);
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Box width="100%" bgcolor={alt} p="1rem 6%" textAlign="center">
        <Typography
          color="primary"
          fontWeight="bold"
          fontSize="32px"
          borderRadius="1.5rem"
          bgcolor={alt}
        >
          Mídia social
        </Typography>
      </Box>

      <Box p="2rem" m="2rem auto" width={isNonMobileScreens ? '50%' : '93%'}>
        <Typography variant="h5" fontWeight="500" sx={{ mb: '1.5rem' }}>
          Bem-vindo ao mídia social ;)
        </Typography>
      </Box>
      <Form />
    </Box>
  );
};
