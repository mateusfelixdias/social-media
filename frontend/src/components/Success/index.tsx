import { Alert, Snackbar } from '@mui/material';
import { ISuccess } from '../../interfaces/props/Success';

export const Success = ({ open, setOpen, message }: ISuccess) => {
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={600} sx={{ color: '#ffffff' }}>
      <Alert
        severity="success"
        onClose={handleClose}
        sx={{
          width: '100%',
          height: '3rem',
          fontSize: '100%',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
