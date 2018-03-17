import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import { isLoggedIn, getUserName, logout } from '../../services/login-service';
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
      getUserName().then(username => this.setState({ username }));
    }
  }

  render() {
    const { loggedIn, username } = this.state;
    const hasUsername = (username !== '');

    return (
      <header className={styles['container']}>
        <h1 className={styles['title']}>Co zjeść?</h1>
        <div className={styles['container--right']}>
          {!loggedIn && <NavLink to="/login">Zaloguj</NavLink>}
          {hasUsername && <div>Witaj, {username}!</div>}
          {loggedIn && <Button onClick={() => logout()}>Wyloguj</Button>}
        </div>
      </header>
    );
  }
}

export default Header;
