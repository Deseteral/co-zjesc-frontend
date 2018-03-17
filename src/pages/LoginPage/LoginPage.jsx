import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
      .then(() => this.setState({ loggedIn: true }))
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
