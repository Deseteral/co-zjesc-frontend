function serviceFetch(url, options = {}) {
  return fetch(
    `${SERVICE_URL}${url}`,
    options,
  );
}

export default serviceFetch;
