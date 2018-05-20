import Cookies from 'js-cookie';

/**
 * Performs fetch to co-zjesc service with authentication.
 * @param {string} url - relative url to resource location
 * @param {object} options - fetch API options
 */
function serviceFetch(url, options = {}) {
  const optionsWithAuthorization = options;
  const token = Cookies.get('token');

  if (token) {
    optionsWithAuthorization.headers = Object.assign(
      {},
      optionsWithAuthorization.headers,
      { 'Authorization': `Bearer ${token}` }, // eslint-disable-line quote-props
    );
  }

  return fetch(
    `${SERVICE_URL}${url}`,
    optionsWithAuthorization,
  );
}

export default serviceFetch;
