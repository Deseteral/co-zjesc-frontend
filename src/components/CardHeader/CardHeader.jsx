import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardHeader.css';

function CardHeader({ children, secondary }) {
  return React.createElement(
    secondary ? 'h2' : 'h1',
    { className: styles['header'] },
    children,
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
};

CardHeader.defaultProps = {
  secondary: false,
};

export default CardHeader;
