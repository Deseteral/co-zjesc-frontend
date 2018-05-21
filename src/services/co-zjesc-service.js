/**
 * @module services/co-zjesc-service
 */

import checkStatus from 'fetch-check-http-status';
import serviceFetch from './service-fetch';

/**
 * Posts new images for recipe.
 * @param {object} formData - form data with file objects
 */
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

/**
 * Resolves with every unit available for the recipes.
 */
function getUnits() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/units')
      .then(checkStatus)
      .then(data => data.json())
      .then(units => resolve(units))
      .catch(e => reject(e));
  });
}

/**
 * Resolves with every product available for the recipes.
 */
function getProducts() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/products')
      .then(checkStatus)
      .then(data => data.json())
      .then(products => resolve(products))
      .catch(e => reject(e));
  });
}

/**
 * Resolves with recipes returned from suggester based on given product IDs.
 * @param {number[]} productIds - IDs of the products
 */
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

/**
 * Searches recipes based on given search query.
 * @param {string} query - search query
 */
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

/**
 * Resolves with recipes in given category.
 * @param {number} categoryId - ID of the category
 */
function getRecipesByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes?category=${categoryId}`)
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

/**
 * Resolved with list of recipes submitted by currently logged in user.
 */
function getRecipesWithUser() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/user/recipes')
      .then(checkStatus)
      .then(data => data.json())
      .then(recipes => resolve(recipes))
      .catch(e => reject(e));
  });
}

/**
 * Resolved with recipe data for given recipe ID.
 * @param {number} recipeId - ID of the recipe
 */
function getRecipe(recipeId) {
  return new Promise((resolve, reject) => {
    serviceFetch(`/api/recipes/${recipeId}`)
      .then(checkStatus)
      .then(data => data.json())
      .then(recipe => resolve(recipe))
      .catch(e => reject(e));
  });
}

/**
 * Resolves with random recipe ID.
 */
function getRandomRecipe() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/recipes/random')
      .then(checkStatus)
      .then(data => data.text())
      .then(recipeId => resolve(recipeId))
      .catch(e => reject(e));
  });
}

/**
 * Resolves with list of carousels for the main page.
 */
function getCarousels() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/carousels')
      .then(checkStatus)
      .then(data => data.json())
      .then(carousels => resolve(carousels))
      .catch(e => reject(e));
  });
}

/**
 * Creates new recipe and resolves with its ID.
 * @param {object} recipe - recipe data object
 */
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

/**
 * Updates (inplace) recipe with new recipe.
 * @param {object} recipe - updated recipe data
 */
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

/**
 * Resolves with list of categories.
 */
function getCategories() {
  return new Promise((resolve, reject) => {
    serviceFetch('/api/categories')
      .then(checkStatus)
      .then(data => data.json())
      .then(categories => resolve(categories))
      .catch(e => reject(e));
  });
}

/**
 * Sends vote to rate the recipe.
 * Resolves with new average recipe rating.
 * @param {number} recipeId - ID of the recipe to rate
 * @param {number} rating - new recipe rating (from 1 to 5)
 */
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

/**
 * Adds specified recipe to favorites for currently logged in user.
 * @param {number} recipeId - ID of the recipe
 */
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

/**
 * Removes specified recipe from favorites of currently logged in user.
 * @param {number} recipeId - ID of the recipe
 */
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

/**
 * Resolves with a list of favorite recipes of currently logged in user.
 */
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
