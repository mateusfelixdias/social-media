import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { themeSettings } from '../../../../themes';
import { Error } from '../../../../components/Error';
import { ChangeEvent, useEffect, useState } from 'react';
import { IFormAuth } from '../../../../interfaces/props/FormAuth';
import { InitialState } from '../../../../interfaces/initialState';
import { IFormAuthPorps } from '../../../../interfaces/props/FormAuthPorps';
import { ITouchedAndErrors } from '../../../../interfaces/props/touchedAndErrors';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const FormAuth = ({
  open,
  props,
  message,
  setOpen,
  disabledButton,
}: IFormAuthPorps) => {
  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleSubmit,
    handleChange,
  } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form, setForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery('(min-width:700px)');

  const mode = useSelector((state: InitialState) => state.mode);
  const theme = themeSettings(mode);
  const pallete = theme.palette;

  const isFieldsInvalids = ({ email, password }: IFormAuth) => {
    return email.length > 10 && password.length >= 6;
  };

  const touchedAndErrors = ({ errors, touched }: ITouchedAndErrors) => {
    return Boolean(touched) && Boolean(errors);
  };

  useEffect(() => {
    setIsDisabled(!isFieldsInvalids(form));
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <Box margin="auto">
        <Box
          gap="30px"
          display="grid"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <TextField
            required
            type="email"
            name="email"
            label="E-mail"
            onBlur={handleBlur}
            value={values.email}
            sx={{ gridColumn: 'span 2' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
              setForm({ ...form, email: event.target.value });
            }}
            error={touchedAndErrors({
              errors: errors.email,
              touched: touched.email,
            })}
            helperText={touchedAndErrors({
              errors: errors.email,
              touched: touched.email,
            })}
          />

          <TextField
            required
            name="password"
            label="Senha"
            type="password"
            onBlur={handleBlur}
            value={values.password}
            sx={{ gridColumn: 'span 2' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, password: event.target.value });
              handleChange(event);
            }}
            error={touchedAndErrors({
              errors: errors.password,
              touched: touched.password,
            })}
            helperText={touchedAndErrors({
              errors: errors.password,
              touched: touched.password,
            })}
          />
        </Box>

        <Box>
          <Button
            type="submit"
            fullWidth={true}
            disabled={isDisabled || disabledButton}
            sx={{
              m: '2rem 0',
              p: '1rem',
              color: pallete.background.alt,
              backgroundColor: pallete.primary.main,
              '&:hover': { color: pallete.primary.main },
              ':disabled': { backgroundColor: pallete.primary.light },
            }}
          >
            Login
          </Button>

          <Typography
            onClick={() => {
              navigate('/register');
              resetForm();
            }}
            sx={{
              textDecoration: 'underline',
              color: pallete.primary.main,
              '&:hover': {
                color: pallete.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            Não tem uma conta? Registre-se Aqui.
          </Typography>
        </Box>

        <Error open={open} setOpen={setOpen} message={message} />
      </Box>
    </form>
  );
};
