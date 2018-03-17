import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../services/login-service';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn(),
    };
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <header>
        {!loggedIn && <NavLink to="/login">Zaloguj</NavLink>}
        {loggedIn && <div>Zalogowany!</div>}
      </header>
    );
  }
}

export default Header;
