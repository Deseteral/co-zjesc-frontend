import Cookies from 'js-cookie';

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
