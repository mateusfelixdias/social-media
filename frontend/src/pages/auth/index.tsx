import { Form } from './steps/Form';
import { useSelector } from 'react-redux';
import { themeSettings } from '../../themes';
import { Box, Typography } from '@mui/material';
import { Header } from '../../components/Header';
import { InitialState } from '../../interfaces/initialState';

export const Auth = () => {
  const mode = useSelector((state: InitialState) => state.mode);

  const theme = themeSettings(mode);
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Header />

      <Box
        p="2rem"
        width="93%"
        m="2rem auto"
        bgcolor={alt}
        borderRadius="1.5rem"
      >
        <Typography
          variant="h5"
          fontWeight="500"
          sx={{ mt: '1.5rem', mb: '1.5rem' }}
        >
          Bem-vindo(a) ao social mídia!
        </Typography>

        <Form />
      </Box>
    </Box>
  );
};
