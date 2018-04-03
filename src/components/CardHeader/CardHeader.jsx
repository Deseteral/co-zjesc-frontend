import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardHeader.css';

function CardHeader({ children }) {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardHeader;
