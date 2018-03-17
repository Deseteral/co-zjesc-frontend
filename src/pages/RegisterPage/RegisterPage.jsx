import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import { register } from '../../services/login-service';
import styles from './RegisterPage.css';

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

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'Podane hasła nie zgadzają się' });
      return;
    }

    register(username, password, confirmPassword)
      .catch((e) => {
        this.setState({ error: 'Rejestracja nie powiodła się, spróbuj ponownie' });
        console.error(e); // eslint-disable-line
      });
  }

  render() {
    const { error } = this.state;

    return (
      <Card className={styles['card']}>
        <CardHeader>
          Zarejestruj się
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
            password
          />
          <TextField
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Potwierdź hasło"
            onChange={value => this.handleChange(value, 'confirmPassword')}
            onEnterPress={e => this.handleSubmit(e)}
            password
          />
          {error && <div className={styles['error-message']}>{error}</div>}
          <Button primary onClick={e => this.handleSubmit(e)}>
            Zarejestruj
          </Button>
        </div>
      </Card>
    );
  }
}

export default RegisterPage;
