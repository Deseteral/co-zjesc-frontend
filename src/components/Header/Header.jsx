import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserLogin from '../UserLogin/UserLogin';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
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
      getUserName().then(username => this.setState({ username }));
    }
  }

  render() {
    const { loggedIn, username } = this.state;

    return (
      <header className={styles['container']}>
        <div className={styles['container--grow']}>
          <NavLink to="/" className={styles['title']}>
            Co zjeść?
          </NavLink>
          <CategoryDropdown />
        </div>
        <UserLogin
          className={styles['container--right']}
          loggedIn={loggedIn}
          username={username}
        />
      </header>
    );
  }
}

export default Header;
