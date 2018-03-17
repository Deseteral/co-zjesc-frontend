import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
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
            label="Nazwa użytkownika"
            value={this.state.username}
            onChange={value => this.handleChange(value, 'username')}
          />
          <TextField
            label="Hasło"
            value={this.state.password}
            onChange={value => this.handleChange(value, 'password')}
            password
          />
          <TextField
            label="Potwierdź hasło"
            value={this.state.confirmPassword}
            onChange={value => this.handleChange(value, 'confirmPassword')}
            onEnterPress={e => this.handleSubmit(e)}
            password
          />
          {error && <div className={styles['error-message']}>{error}</div>}
          <div className={styles['button']}>
            <Button
              variant="raised"
              color="primary"
              onClick={e => this.handleSubmit(e)}
            >
              Zarejestruj
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default RegisterPage;
