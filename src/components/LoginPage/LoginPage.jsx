import React, { Component } from 'react';
import css from 'classnames';
import styles from './LoginPage.css';
import commonStyles from '../../common.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange(event, part) {
    this.setState({ [part]: event.target.value });
  }

  handleSubmit(event) {
    const { username, password } = this.state;
    console.log(username, password);
    event.preventDefault();
  }

  render() {
    return (
      <div className={css(commonStyles['card'], styles['card'])}>
        <h1 className={styles['header']}>Zaloguj się</h1>
        <form
          className={styles['form']}
          action={`${SERVICE_URL}/token`}
          method="POST"
          onSubmit={e => this.handleSubmit(e)}
        >
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
          <input type="hidden" name="grant_type" value="password" />
          <input className={styles['button']} type="submit" value="Zaloguj" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
