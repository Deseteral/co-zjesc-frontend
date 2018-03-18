import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';

function LoggedOut({ className }) {
  return (
    <div className={className}>
      <Button to="/register" component={NavLink}>Zarejestruj się</Button>
      <Button to="/login" component={NavLink}>Zaloguj</Button>
    </div>
  );
}

LoggedOut.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LoggedOut;
