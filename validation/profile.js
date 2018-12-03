const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, {min: 2, max: 40} )) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (!Validator.isAlphanumeric(data.handle) ||
      data.handle.indexOf(' ') >= 0
      ) {
    errors.handle = 'Handle must not contain spaces or special characters, only A-Z and 0-9'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!isEmpty(data.website) && !Validator.isURL(data.website)) errors.website =        'Not a valid URL'; // Website
  if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) errors.youtube =        'Not a valid URL'; // Youtube
  if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) errors.twitter =        'Not a valid URL'; // Twitter
  if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) errors.facebook =     'Not a valid URL'; // Facebook
  if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) errors.instagram =  'Not a valid URL'; // Instagram
  if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) errors.linkedin =     'Not a valid URL'; // LinkedIn

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
