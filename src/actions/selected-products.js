/**
 * @module actions/selected-products
 */

const SELECTED_PRODUCTS_ADD_PRODUCT = 'SELECTED_PRODUCTS_ADD_PRODUCT';
const SELECTED_PRODUCTS_REMOVE_PRODUCT = 'SELECTED_PRODUCTS_REMOVE_PRODUCT';

/**
 * Creates redux action that represents adding new product to the list
 * @param {object} product - recipe product
 * @returns redux standard action
 */
function addProduct(product) {
  return {
    type: SELECTED_PRODUCTS_ADD_PRODUCT,
    payload: product,
  };
}

/**
 * Creates redux action that represents removing product from the list
 * @param {number} productId - recipe product id
 * @returns redux standard action
 */
function removeProduct(productId) {
  return {
    type: SELECTED_PRODUCTS_REMOVE_PRODUCT,
    payload: productId,
  };
}

export {
  addProduct,
  removeProduct,
  SELECTED_PRODUCTS_ADD_PRODUCT,
  SELECTED_PRODUCTS_REMOVE_PRODUCT,
};
