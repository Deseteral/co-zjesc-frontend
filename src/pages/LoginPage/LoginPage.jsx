import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card from '../../components/Card/Card';
import TextField from '../../components/TextField/TextField';
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
      <Card>
        <Typography variant="headline" component="h2">
          Zaloguj się
        </Typography>
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
          {error && <Typography color="error">{error}</Typography>}
          <div className={styles['link-container']}>
            Nie masz konta?&nbsp;
            <NavLink to="register" className={styles['link']}>
              Zarejestruj się!
            </NavLink>
          </div>
          <div className={styles['button']}>
            <Button
              variant="raised"
              color="primary"
              onClick={e => this.handleSubmit(e)}
            >
              Zaloguj się
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default LoginPage;
