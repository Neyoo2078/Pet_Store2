// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
export const validate = (values) => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'Cannot be Empty';
  } else if (values.firstname.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastname) {
    errors.lastname = 'Cannot be Empty';
  } else if (values.lastname.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Cannot be Empty';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.state) {
    errors.state = 'Select state';
  }
  if (!values.city) {
    errors.city = 'Select city';
  }

  return errors;
};
