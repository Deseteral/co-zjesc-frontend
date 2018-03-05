import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.css';

function TextField({ name, value, placeholder, onChange, password }) {
  const type = password ? 'password' : 'text';

  return (
    <input
      className={styles['input']}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      type={type}
    />
  );
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.bool,
};

TextField.defaultProps = {
  value: '',
  placeholder: '',
  password: false,
};

export default TextField;
