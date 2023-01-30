import { Alert, Snackbar } from '@mui/material';
import { IError } from '../../interfaces/props/Error';

export const Error = ({ open, setOpen, message }: IError) => {
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={600} sx={{ color: '#ffffff' }}>
      <Alert
        severity="error"
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
