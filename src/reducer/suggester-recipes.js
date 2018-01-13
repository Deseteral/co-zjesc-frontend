import {
  RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED,
} from '../actions/recipes-by-products';

function suggesterRecipes(state = [], action) {
  switch (action.type) {
    case RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED:
      return action.payload.slice();
    default:
      return state;
  }
}

export default suggesterRecipes;
