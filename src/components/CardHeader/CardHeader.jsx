import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardHeader.css';

function CardHeader({ children }) {
  return (
    <h1 className={styles['header']}>
      {children}
    </h1>
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardHeader;
