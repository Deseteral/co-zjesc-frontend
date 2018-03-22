/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { default as MaterialSelect } from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

function Select({ id, label, options, onChange }) {
  return (
    <FormControl>
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <MaterialSelect
        native
        onChange={e => onChange(e.target.value)}
        inputProps={({ id })}
      >
        <option value="" />
        {options.map(option => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </MaterialSelect>
    </FormControl>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
