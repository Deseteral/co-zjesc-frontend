import checkStatus from 'fetch-check-http-status';

function getProducts() {
  return new Promise((resolve, reject) => {
    fetch(`${SERVICE_URL}/api/products`)
      .then(checkStatus)
      .then(data => data.json())
      .then(products => resolve(products))
      .catch(e => reject(e));
  });
}

const CoZjescService = {
  products: {
    get: getProducts,
  },
};

export default CoZjescService;
