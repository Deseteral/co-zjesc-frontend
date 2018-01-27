const DEFAULT_OPTIONS = {
  credentials: 'same-origin',
};

function serviceFetch(url, options = {}) {
  return fetch(
    `${SERVICE_URL}${url}`,
    Object.assign({}, DEFAULT_OPTIONS, options),
  );
}

export default serviceFetch;
