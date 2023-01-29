import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { themeSettings } from '../../../themes';
import { FlexBetween } from '../../../components/FlexBetween';
import { InitialState } from '../../../interfaces/initialState';
import { WidgetWrapper } from '../../../components/WidgetWrapper';

export const Advert = () => {
  const { mode } = useSelector((state: InitialState) => state);

  const { palette } = themeSettings(mode);

  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Patrocinadores
        </Typography>
        <Typography color={medium}>Criar um anúncio</Typography>
      </FlexBetween>

      <img
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
        src={`${import.meta.env.VITE_API_URL}/public/assets/info4.jpeg`}
      />

      <FlexBetween>
        <Typography>Mika cosmético</Typography>
        <Typography color={medium}>mikacosmético.com</Typography>
      </FlexBetween>

      <Typography color={medium} m="0.5rem 0">
        Seu caminho para uma beleza deslumbrante e imaculada e garante que sua
        pele está esfoliando a pele e brilhando como a luz.
      </Typography>
    </WidgetWrapper>
  );
};
