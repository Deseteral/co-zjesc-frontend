import React from 'react';
import Icon from 'material-ui/Icon';
import styles from './Maintenance.css';

/**
 * Maintenance page view.
 */
function Maintenance() {
  return (
    <div className={styles['container']}>
      <Icon style={({ fontSize: '125px' })}>warning</Icon>
      <h1 className={styles['message']}>
        Wystąpił jakiś problem, spróbuj ponownie później.
      </h1>
    </div>
  );
}

export default Maintenance;
