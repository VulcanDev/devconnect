import React from 'react';
import keys_prod from './keys_prod';
import keys_dev from './keys_dev';

let keys;

if (process.env.REACT_ENV_PROD) {
  keys = keys_prod;
} else {
  keys = keys_dev;
}

export default keys;
