const SELECTED_PRODUCTS_ADD_PRODUCT = 'SELECTED_PRODUCTS_ADD_PRODUCT';
const SELECTED_PRODUCTS_REMOVE_PRODUCT = 'SELECTED_PRODUCTS_REMOVE_PRODUCT';

function addProduct(product) {
  return {
    type: SELECTED_PRODUCTS_ADD_PRODUCT,
    payload: product,
  };
}

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
