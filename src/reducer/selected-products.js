import {
  SELECTED_PRODUCTS_ADD_PRODUCT,
  SELECTED_PRODUCTS_REMOVE_PRODUCT,
} from '../actions/selected-products';

function selectedProducts(state = [], action) {
  switch (action.type) {
    case SELECTED_PRODUCTS_ADD_PRODUCT:
      return [...state, action.payload];
    case SELECTED_PRODUCTS_REMOVE_PRODUCT: {
      const index = state.findIndex(p => p.id === action.payload);
      const copy = state.slice();
      copy.splice(index, 1);
      return copy;
    }
    default:
      return state;
  }
}

export default selectedProducts;
