import React, { Component } from 'react';
import css from 'classnames';
import Cookies from 'js-cookie';
import { login } from '../../services/login-service';
import styles from './LoginPage.css';
import commonStyles from '../../common.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleChange(event, part) {
    this.setState({ [part]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    login(username, password)
      .then((authData) => {
        console.log(authData); // eslint-disable-line
        if (authData.access_token) {
          Cookies.set('token', authData.access_token);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        this.setState({ error: 'Logowanie nie powiodło się' });
        console.error(e); // eslint-disable-line
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div className={css(commonStyles['card'], styles['card'])}>
        <h1 className={styles['header']}>Zaloguj się</h1>
        <div className={styles['input-container']}>
          <input
            className={styles['input']}
            name="username"
            value={this.state.login}
            placeholder="Nazwa użytkownika"
            onChange={e => this.handleChange(e, 'username')}
            type="text"
          />
          <input
            className={styles['input']}
            name="password"
            value={this.state.password}
            placeholder="Hasło"
            onChange={e => this.handleChange(e, 'password')}
            type="password"
          />
          {error && <div className={styles['error-message']}>{error}</div>}
          <button
            className={styles['button']}
            onClick={e => this.handleSubmit(e)}
          >
            Zaloguj
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
