import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
};

export default Button;
