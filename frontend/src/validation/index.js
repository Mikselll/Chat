import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

export default schema;
