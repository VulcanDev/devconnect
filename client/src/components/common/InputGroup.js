import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  icon,
  info,
  onChange
}) => {
  return (
    <div>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className={icon} />
          </span>
        </div>
        <textarea
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <div className='invalid-feedback f-block'>{error}</div>}
      {info && <small className='form-text text-muted mb-3'>{info}</small>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = { type: 'text' };

export default InputGroup;
