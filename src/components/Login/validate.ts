const validate = (values: any) => {
  interface Errors {
    email?: string;
    password?: string;
    login?: string;
  }
  const errors: Errors = {};
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email address';
  if (!values.password) errors.password = 'Required';
  else if (values.password.length > 30)
    errors.password = 'Must be 30 characters or less';
  return errors;
};

export default validate;
