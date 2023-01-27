import { Box } from '@mui/material';

interface IUserImage {
  image: string;
  size?: string;
}

export const UserImage = ({ image, size = '60px' }: IUserImage) => {
  return (
    <Box height={size} width={size}>
      <img
        width={size}
        height={size}
        alt="usuário"
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        src={`${import.meta.env.VITE_API_URL}/public/assets/${image}`}
      />
    </Box>
  );
};
