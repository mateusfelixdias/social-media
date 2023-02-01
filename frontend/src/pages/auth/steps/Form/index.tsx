import { useState } from 'react';
import { FormAuth } from '../FormAuth';
import { api } from '../../../../lib/api';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../states';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../../../interfaces/user';
import auth from '../../../../utils/validation/auth';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { IFormProps } from '../../../../interfaces/props/form';
import { responses } from '../../../../utils/validation/auth/responses';

const { initialAuthValues }: FormikValues = auth;

export const Form = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { setLogin } = actions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchLogin = (user: IUser, token: string) => {
    dispatch(
      setLogin({
        user,
        token,
      })
    );
  };

  const login = async ({ values, props }: IFormProps) => {
    try {
      const { status, data } = await api.post('/auth', {
        data: { ...values },
      });

      if (status === 200) {
        const { user, token } = data;
        dispatchLogin(user, token);

        props.resetForm();
        navigate('/home');
      }

      setMessage(responses(status));
    } catch (err: any) {
      setOpen(true);
      setIsDisabled(false);

      const { status } = err.response;
      setMessage(responses(status));
    }
  };

  const handleFormSubmit = async (
    values: FormikValues,
    props: FormikHelpers<FormikValues>
  ) => {
    setIsDisabled(true);

    return login({ values, props });
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialAuthValues}>
      {(params) => {
        return (
          <FormAuth
            open={open}
            props={params}
            setOpen={setOpen}
            message={message}
            disabledButton={isDisabled}
          />
        );
      }}
    </Formik>
  );
};
