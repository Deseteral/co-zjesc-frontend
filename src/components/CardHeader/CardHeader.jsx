import React from 'react';
import styles from './CardHeader.css';

function CardHeader({ children }) {
  return (
    <h1 className={styles['header']}>
      {children}
    </h1>
  );
}

export default CardHeader;
