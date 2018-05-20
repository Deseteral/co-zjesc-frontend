import checkStatus from 'fetch-check-http-status';
import Cookies from 'js-cookie';
import serviceFetch from './service-fetch';

/**
 * Forces redirect to main page.
 */
function hardRedirectToMainPage() {
  window.location.assign('/');
}

/**
 * Tries to get users token given username and password.
 * When successful user token is saved as cookie and used in future requests.
 * @param {string} username - login username
 * @param {string} password - login password
 */
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

/**
 * Removes user token cookie.
 */
function logout() {
  Cookies.remove('token');
  hardRedirectToMainPage();
}

/**
 * Tries to register a new user in service and when successful logs new user in.
 * @param {string} userName - username of new user
 * @param {*} password - password for new user
 * @param {*} confirmPassword - password for new user
 */
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

/**
 * Resolves with username of logged user.
 */
function getUserName() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/user')
      .then(checkStatus)
      .then(data => data.json())
      .then(data => resolve(data.login))
      .catch(e => reject(e));
  });
}

/**
 * Checks whether user is logged in.
 * @return {boolean} - true is user is logged in, false otherwise
 */
function isLoggedIn() {
  return Cookies.get('token') !== undefined;
}

export {
  login,
  logout,
  register,
  isLoggedIn,
  getUserName,
};
