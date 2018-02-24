import React from 'react';
import css from 'classnames';
import styles from './Button.css';

function Button({ children, onClick, primary }) {
  const buttonClassName = css(
    styles['button'],
    primary ? styles['primary'] : null,
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
