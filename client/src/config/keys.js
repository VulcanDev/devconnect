let keys;

if (true) {
  // Production ?
  keys = require('./keys_prod');
} else {
  keys = require('keys_dev');
}

export default keys;
