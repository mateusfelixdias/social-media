import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('E-mail inválido!'),
  password: z.string().min(6),
});

const initialAuthValues = {
  email: '',
  password: '',
};

export default { initialAuthValues, authSchema };
