const PRODUCTS_FETCH_REQUESTED = 'PRODUCTS_FETCH_REQUESTED';
const PRODUCTS_FETCH_SUCCEEDED = 'PRODUCTS_FETCH_SUCCEEDED';
const PRODUCTS_FETCH_FAILED = 'PRODUCTS_FETCH_FAILED';

function productsFetch() {
  return {
    type: PRODUCTS_FETCH_REQUESTED,
  };
}

function productsFetchSucceeded(products) {
  return {
    type: PRODUCTS_FETCH_SUCCEEDED,
    payload: products,
  };
}

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
