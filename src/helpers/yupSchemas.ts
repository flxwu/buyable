import * as yup from 'yup';

export const User = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(50),
  email: yup.string().email(),
  password: yup
    .string()
    .min(8)
    .max(128)
});
