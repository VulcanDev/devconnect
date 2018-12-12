import keys_prod from './keys_prod';
import keys_dev from './keys_dev';

let keys;

if (process.env.NODE_ENV === 'production') {
  keys = keys_prod;
} else {
  keys = keys_dev;
}

export default keys;
