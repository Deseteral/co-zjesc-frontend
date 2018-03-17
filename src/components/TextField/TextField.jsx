/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { default as MaterialTextField } from 'material-ui/TextField';

function handleKeyPress(event, onEnterPress) {
  if (event.key === 'Enter') {
    onEnterPress(event);
  }
}

function TextField({ value, label, onChange, onEnterPress, password }) {
  const type = password ? 'password' : 'text';

  return (
    <MaterialTextField
      label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      inputProps={({
        onKeyPress: (e => handleKeyPress(e, onEnterPress)),
      })}
      type={type}
    />
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
