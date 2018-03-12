import checkStatus from 'fetch-check-http-status';
import serviceFetch from './service-fetch';

function getUnits() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/units')
      .then(checkStatus)
      .then(data => data.json())
      .then(units => resolve(units))
      .catch(e => reject(e));
  });
}

function getProducts() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/products')
      .then(checkStatus)
      .then(data => data.json())
      .then(products => resolve(products))
      .catch(e => reject(e));
  });
}

function getRecipesByProducts(productIds) {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/recipes/getRecipesByProducts', {
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

function getRecipe(recipeId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes/${recipeId}`)
      .then(checkStatus)
      .then(data => data.json())
      .then(recipe => resolve(recipe))
      .catch(e => reject(e));
  });
}

function postRecipe(recipe) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(recipe);
    const options = {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    serviceFetch('/api/recipes', options)
      .then(checkStatus)
      .then(() => resolve())
      .catch(e => reject(e));
  });
}

const CoZjescService = {
  units: {
    get: getUnits,
  },
  products: {
    get: getProducts,
  },
  recipes: {
    getByProducts: getRecipesByProducts,
    getById: getRecipe,
    add: postRecipe,
  },
};

export default CoZjescService;
