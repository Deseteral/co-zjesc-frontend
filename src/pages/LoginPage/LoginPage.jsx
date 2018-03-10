import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import { login } from '../../services/login-service';
import styles from './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loggedIn: false,
    };
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    login(username, password)
      .then((authData) => {
        console.log(authData); // eslint-disable-line
        if (authData.access_token) {
          Cookies.set('token', authData.access_token, { expires: 1 });
          this.setState({ loggedIn: true });
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

    if (this.state.loggedIn) {
      return (<Redirect to="/" />);
    }

    return (
      <Card className={styles['card']}>
        <CardHeader>
          Zaloguj się
        </CardHeader>
        <div className={styles['input-container']}>
          <TextField
            name="username"
            value={this.state.username}
            placeholder="Nazwa użytkownika"
            onChange={value => this.handleChange(value, 'username')}
          />
          <TextField
            name="password"
            value={this.state.password}
            placeholder="Hasło"
            onChange={value => this.handleChange(value, 'password')}
            onEnterPress={e => this.handleSubmit(e)}
            password
          />
          {error && <div className={styles['error-message']}>{error}</div>}
          <Button primary onClick={e => this.handleSubmit(e)}>
            Zaloguj
          </Button>
        </div>
      </Card>
    );
  }
}

export default LoginPage;
