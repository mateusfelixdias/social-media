import bcrypt from 'bcrypt';

export const hashThePassword = async (
  password: string
): Promise<string | boolean> => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  } catch (err) {
    console.log(err);
    return `Ocorreu um erro ao tentar gerar hash na senha fornecida!`;
  }
};
