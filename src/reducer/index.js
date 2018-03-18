import { combineReducers } from 'redux';
import products from './products';
import suggesterRecipes from './suggester-recipes';
import selectedProducts from './selected-products';

const reducers = combineReducers({
  products,
  suggesterRecipes,
  selectedProducts,
});

export default reducers;
