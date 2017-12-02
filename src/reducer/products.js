import {
  PRODUCTS_FETCH_SUCCEEDED,
} from '../actions/products';

function products(state = [], action) {
  switch (action.type) {
    case PRODUCTS_FETCH_SUCCEEDED:
      return action.payload.slice();
    default:
      return state;
  }
}

export default products;
