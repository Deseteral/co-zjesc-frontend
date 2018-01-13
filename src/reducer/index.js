import { combineReducers } from 'redux';
import products from './products';
import suggesterRecipes from './suggester-recipes';

const reducers = combineReducers({
  products,
  suggesterRecipes,
});

export default reducers;
