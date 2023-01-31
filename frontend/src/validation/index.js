import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().max(10, 'Must be 10 characters or less').required('Required'),
});

export default schema;
