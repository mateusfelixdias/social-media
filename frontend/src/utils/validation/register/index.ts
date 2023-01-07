import { z } from 'zod';

const registerSchema = z.object({
  picture: z.string(),
  lastName: z.string(),
  location: z.string(),
  firstName: z.string(),
  occupation: z.string(),
  password: z.string().min(6),
  email: z.string().email('E-mail inválido!'),
});

const initialRegisterValues = {
  picture: '',
  lastName: '',
  location: '',
  firstName: '',
  occupation: '',
  password: '',
  email: '',
};

export default { registerSchema, initialRegisterValues };
