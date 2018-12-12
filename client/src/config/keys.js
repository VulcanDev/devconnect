import React from 'react';
import keys_prod from './keys_prod';
import keys_dev from './keys_dev';

let keys;

if (true) { // Production ?
  keys = keys_prod;
} else {
  keys = keys_dev;
}

export default keys;
