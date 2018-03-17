import React, { Component } from 'react';
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
    };
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    login(username, password)
      .catch((e) => {
        this.setState({ error: 'Logowanie nie powiodło się' });
        console.error(e); // eslint-disable-line
      });
  }

  render() {
    const { error } = this.state;

    return (
      <Card className={styles['card']}>
        <CardHeader>
          Zaloguj się
        </CardHeader>
        <div className={styles['input-container']}>
          <TextField
            value={this.state.username}
            label="Nazwa użytkownika"
            onChange={value => this.handleChange(value, 'username')}
          />
          <TextField
            value={this.state.password}
            label="Hasło"
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
