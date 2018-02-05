import React, { Component } from 'react';
import css from 'classnames';
// import Cookies from 'js-cookie';
import { register } from '../../services/login-service';
import styles from './RegisterPage.css';
import commonStyles from '../../common.css';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  }

  handleChange(event, part) {
    this.setState({ [part]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'Podane hasła nie zgadzają się' });
      return;
    }

    register(username, password, confirmPassword)
      .then((authData) => {
        console.log(authData);
      })
      .catch((e) => {
        this.setState({ error: 'Rejestracja nie powiodła się, spróbuj ponownie' });
        console.error(e);
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div className={css(commonStyles['card'], styles['card'])}>
        <h1 className={styles['header']}>Zarejestruj się</h1>
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
          <input
            className={styles['input']}
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Potwierdź hasło"
            onChange={e => this.handleChange(e, 'confirmPassword')}
            type="password"
          />
          {error && <div className={styles['error-message']}>{error}</div>}
          <button
            className={styles['button']}
            onClick={e => this.handleSubmit(e)}
          >
            Zarejestruj
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
