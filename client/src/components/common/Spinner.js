import React from 'react';
import spinner from './spinner.svg';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '64px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};

export default Spinner;
