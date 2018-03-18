import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import styles from './LoggedOut.css';

function LoggedOut({ className }) {
  return (
    <div className={className}>
      <div className={styles['register-button']}>
        <Button color="primary" to="/register" component={NavLink}>
          Zarejestruj się
        </Button>
      </div>
      <Button color="primary" to="/login" component={NavLink}>
        Zaloguj
      </Button>
    </div>
  );
}

LoggedOut.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LoggedOut;
