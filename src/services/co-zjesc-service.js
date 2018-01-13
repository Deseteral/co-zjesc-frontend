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

function getRecipesByProducts(productIds) {
  return new Promise((resolve, reject) => {
    fetch(`${SERVICE_URL}/api/recipes/getRecipesByProducts`, {
      method: 'POST',
      body: JSON.stringify(productIds),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

const CoZjescService = {
  products: {
    get: getProducts,
  },
  recipes: {
    getByProducts: getRecipesByProducts,
  },
};

export default CoZjescService;
