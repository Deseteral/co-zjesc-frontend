/**
 * @module actions/recipes-by-products
 */

const RECIPES_BY_PRODUCTS_FETCH_REQUESTED = 'RECIPES_BY_PRODUCTS_FETCH_REQUESTED';
const RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED = 'RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED';
const RECIPES_BY_PRODUCTS_FETCH_FAILED = 'RECIPES_BY_PRODUCTS_FETCH_FAILED';

/**
 * Creates redux action that represents recipes fetching request
 * @param {number[]} productIds - ids of products that were selected
 * @returns redux standard action
 */
function recipesByProductsFetch(productIds) {
  return {
    type: RECIPES_BY_PRODUCTS_FETCH_REQUESTED,
    payload: productIds,
  };
}

/**
 * Creates redux action that represents successful recipes fetching
 * @param {object[]} recipes - recipes that were fetched
 * @returns redux standard action
 */
function recipesByProductsFetchSucceeded(recipes) {
  return {
    type: RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED,
    payload: recipes,
  };
}

/**
 * Creates redux action that represents failed recipes fetching
 * @param {string} message - error message
 * @returns redux standard action
 */
function recipesByProductsFetchFailed(message) {
  return {
    type: RECIPES_BY_PRODUCTS_FETCH_FAILED,
    message,
  };
}

export {
  recipesByProductsFetch,
  recipesByProductsFetchSucceeded,
  recipesByProductsFetchFailed,
  RECIPES_BY_PRODUCTS_FETCH_REQUESTED,
  RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED,
  RECIPES_BY_PRODUCTS_FETCH_FAILED,
};
