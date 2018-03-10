import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.css';

function handleKeyPress(event, onEnterPress) {
  if (event.key === 'Enter') {
    onEnterPress(event);
  }
}

function TextField({ name, value, placeholder, onChange, onEnterPress, password }) {
  const type = password ? 'password' : 'text';

  return (
    <input
      className={styles['input']}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onKeyPress={e => handleKeyPress(e, onEnterPress)}
      type={type}
    />
  );
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  password: PropTypes.bool,
};

TextField.defaultProps = {
  value: '',
  placeholder: '',
  onEnterPress: (() => {}),
  password: false,
};

export default TextField;
