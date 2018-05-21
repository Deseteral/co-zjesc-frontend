/**
 * @module components/Spinner
 */

import React from 'react';
import styles from './Spinner.css';

/**
 * Stateless spinner component.
 */
function Spinner() {
  return (
    <div className={styles['loader']}>Wczytywanie...</div>
  );
}

export default Spinner;
