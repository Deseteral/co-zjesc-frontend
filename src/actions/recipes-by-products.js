const RECIPES_BY_PRODUCTS_FETCH_REQUESTED = 'RECIPES_BY_PRODUCTS_FETCH_REQUESTED';
const RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED = 'RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED';
const RECIPES_BY_PRODUCTS_FETCH_FAILED = 'RECIPES_BY_PRODUCTS_FETCH_FAILED';

function recipesByProductsFetch(productIds) {
  return {
    type: RECIPES_BY_PRODUCTS_FETCH_REQUESTED,
    payload: productIds,
  };
}

function recipesByProductsFetchSucceeded(recipes) {
  return {
    type: RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED,
    payload: recipes,
  };
}

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
