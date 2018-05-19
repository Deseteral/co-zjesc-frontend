/**
 * @module actions/products
 */

const PRODUCTS_FETCH_REQUESTED = 'PRODUCTS_FETCH_REQUESTED';
const PRODUCTS_FETCH_SUCCEEDED = 'PRODUCTS_FETCH_SUCCEEDED';
const PRODUCTS_FETCH_FAILED = 'PRODUCTS_FETCH_FAILED';

/**
 * Creates redux action that represents products fetching request
 * @returns redux standard action
 */
function productsFetch() {
  return {
    type: PRODUCTS_FETCH_REQUESTED,
  };
}

/**
 * Creates redux action that represents successful products fetch
 * @param {object[]} products - list of products that were fetched
 * @returns redux standard action
 */
function productsFetchSucceeded(products) {
  return {
    type: PRODUCTS_FETCH_SUCCEEDED,
    payload: products,
  };
}

/**
 * Creates redux action that represents failed products fetch
 * @param {string} message - error message
 * @returns redux standard action
 */
function productsFetchFailed(message) {
  return {
    type: PRODUCTS_FETCH_FAILED,
    message,
  };
}

export {
  productsFetch,
  productsFetchSucceeded,
  productsFetchFailed,
  PRODUCTS_FETCH_REQUESTED,
  PRODUCTS_FETCH_SUCCEEDED,
  PRODUCTS_FETCH_FAILED,
};
