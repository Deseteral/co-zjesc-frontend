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

  render() {
    return (
      <div className={css(commonStyles['card'])}>
        <form
          className={styles['card']}
          action={`${SERVICE_URL}/token`}
          method="POST"
        >
          <input
            name="username"
            value={this.state.login}
            onChange={e => this.handleChange(e, 'username')}
            type="text"
          />
          <input
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e, 'password')}
            type="password"
          />
          <input type="hidden" name="grant_type" value="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
