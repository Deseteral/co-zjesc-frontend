import checkStatus from 'fetch-check-http-status';
import serviceFetch from './service-fetch';

function postImages(formData) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: formData,
    };

    serviceFetch('/api/recipes/uploadRecipeImages', options)
      .then(checkStatus)
      .then(data => data.json())
      .then(images => resolve(images))
      .catch(e => reject(e));
  });
}

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

function getRecipesByQuery(query) {
  const encodedQuery = encodeURI(query);

  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes?search=${encodedQuery}`)
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

function getRecipesByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes?category=${categoryId}`)
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

function getRecipesWithUser() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/user/recipes')
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

function getRandomRecipe() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/recipes/random')
      .then(checkStatus)
      .then(data => data.text())
      .then(recipeId => resolve(recipeId))
      .catch(e => reject(e));
  });
}

function getCarousels() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/carousels')
      .then(checkStatus)
      .then(data => data.json())
      .then(carousels => resolve(carousels))
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
      .then(data => data.json())
      .then(id => resolve(id))
      .catch(e => reject(e));
  });
}

function putRecipe(recipe) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(recipe);
    const options = {
      body,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    serviceFetch(`/api/recipes/${recipe.id}`, options)
      .then(checkStatus)
      .then(data => data.json())
      .then(id => resolve(id))
      .catch(e => reject(e));
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/categories')
      .then(checkStatus)
      .then(data => data.json())
      .then(categories => resolve(categories))
      .catch(e => reject(e));
  });
}

function rateRecipe(recipeId, rating) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes/${recipeId}/${rating}`, {
      method: 'POST',
    })
      .then(checkStatus)
      .then(res => res.text())
      .then(data => parseFloat(data))
      .then(rate => resolve(rate))
      .catch(e => reject(e));
  });
}

function addRecipeToFavorites(recipeId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes/favorite/add?id=${recipeId}`, {
      method: 'POST',
    })
      .then(checkStatus)
      .then(data => data.text())
      .then(text => resolve(JSON.parse(text)))
      .catch(e => reject(e));
  });
}

function removeRecipeFromFavorites(recipeId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes/favorite/remove?id=${recipeId}`, {
      method: 'POST',
    })
      .then(checkStatus)
      .then(data => data.text())
      .then(text => resolve(JSON.parse(text)))
      .catch(e => reject(e));
  });
}

function getFavoriteRecipes() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/recipes/favorites')
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

const CoZjescService = {
  images: {
    post: postImages,
  },
  units: {
    get: getUnits,
  },
  products: {
    get: getProducts,
  },
  recipes: {
    getByProducts: getRecipesByProducts,
    getById: getRecipe,
    getByCategoryId: getRecipesByCategory,
    getFromCurrentUser: getRecipesWithUser,
    add: postRecipe,
    update: putRecipe,
    search: getRecipesByQuery,
    getRandom: getRandomRecipe,
    rate: rateRecipe,
    favorites: {
      add: addRecipeToFavorites,
      remove: removeRecipeFromFavorites,
      getAll: getFavoriteRecipes,
    },
  },
  categories: {
    get: getCategories,
  },
  carousels: {
    get: getCarousels,
  },
};

export default CoZjescService;
