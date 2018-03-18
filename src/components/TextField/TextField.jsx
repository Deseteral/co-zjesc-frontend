/* eslint-disable import/no-named-default, react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { default as MaterialTextField } from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import styles from './TextField.css';

function handleKeyPress(event, onEnterPress) {
  if (event.key === 'Enter') {
    onEnterPress(event);
  }
}

function TextField({ value, label, fullWidth, endAdornment, onChange, onEnterPress, password }) {
  const type = password ? 'password' : 'text';
  const InputProps = endAdornment
    ? ({
      endAdornment: (<InputAdornment position="end">{endAdornment}</InputAdornment>)
    }) : ({});

  return (
    <div className={styles['wrapper']}>
      <MaterialTextField
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        InputProps={InputProps}
        inputProps={({
          onKeyPress: (e => handleKeyPress(e, onEnterPress)),
        })}
        type={type}
        fullWidth={fullWidth}
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
  fullWidth: PropTypes.bool,
  endAdornment: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  onEnterPress: (() => {}),
  password: false,
  fullWidth: false,
  endAdornment: null,
};

export default TextField;
