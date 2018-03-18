/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { default as MaterialTextField } from 'material-ui/TextField';
import styles from './TextField.css';

function handleKeyPress(event, onEnterPress) {
  if (event.key === 'Enter') {
    onEnterPress(event);
  }
}

function TextField({ value, label, onChange, onEnterPress, password }) {
  const type = password ? 'password' : 'text';

  return (
    <div className={styles['wrapper']}>
      <MaterialTextField
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        inputProps={({
          onKeyPress: (e => handleKeyPress(e, onEnterPress)),
        })}
        type={type}
        fullWidth
      />
    </div>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  password: PropTypes.bool,
};

TextField.defaultProps = {
  value: '',
  onEnterPress: (() => {}),
  password: false,
};

export default TextField;
