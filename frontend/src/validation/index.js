import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

export const messageSchema = yup.object({
  text: yup.string().required('Required'),
});
