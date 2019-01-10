import * as yup from 'yup';

/**
 * YUP schemas for validating PATCH request bodies
 */

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
