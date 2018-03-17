import checkStatus from 'fetch-check-http-status';
import Cookies from 'js-cookie';
import serviceFetch from './service-fetch';

function hardRedirectToMainPage() {
  window.location.replace('/');
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    const formData = new URLSearchParams();
    formData.set('username', username);
    formData.set('password', password);
    formData.set('grant_type', 'password');

    serviceFetch('/token', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(checkStatus)
      .then(data => data.json())
      .then((authData) => {
        if (authData.access_token) {
          Cookies.set('token', authData.access_token, { expires: 1 });
          hardRedirectToMainPage();
        } else {
          throw new Error();
        }
      })
      .catch(e => reject(e));
  });
}

function register(userName, password, confirmPassword) {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/account/register', {
      method: 'POST',
      body: JSON.stringify({ userName, password, confirmPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(() => login(userName, password))
      .then(() => hardRedirectToMainPage())
      .catch(e => reject(e));
  });
}

function getUserName() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/user')
      .then(checkStatus)
      .then(data => data.json())
      .then(d => console.log(d))
      .catch(e => reject(e));
  });
}

function isLoggedIn() {
  return Cookies.get('token') !== undefined;
}

export {
  login,
  register,
  isLoggedIn,
  getUserName,
};
