import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardHeader.css';

/**
 * Text header for the card.
 * @param {object} props - component props
 */
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
