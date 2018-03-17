import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn, getUserName } from '../../services/login-service';
import styles from './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn(),
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      getUserName();
    }
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <header className={styles['card']}>
        <h1 className={styles['title']}>Co zjeść?</h1>
        {!loggedIn && <NavLink to="/login">Zaloguj</NavLink>}
        {loggedIn && <div>Zalogowany!</div>}
      </header>
    );
  }
}

export default Header;
