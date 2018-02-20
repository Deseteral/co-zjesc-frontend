import React from 'react';
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

export default TextField;
