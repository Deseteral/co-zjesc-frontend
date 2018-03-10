import React from 'react';
import PropTypes from 'prop-types';

function Select({ name, options, onChange }) {
  return (
    <select
      name={name}
      defaultValue=""
      onChange={e => onChange(e.target.value)}
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
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
