import {
  RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED,
} from '../actions/recipes-by-products';

// TODO: REMOVE
const DEFAULT_STATE = [
  { id: 1, title: 'Pomidorowa' },
  { id: 2, title: 'Grzybowa' },
  { id: 3, title: 'Schabowe z ziemniakami' },
  { id: 4, title: 'Frytki' },
  { id: 5, title: 'Krupnik' },
  { id: 6, title: 'Roladki serowe z boczkiem' },
  { id: 7, title: 'Chleb ze smalcem' },
  { id: 8, title: 'Grilowana pierś z kurczaka' },
  { id: 9, title: 'Burger' },
];

function suggesterRecipes(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case RECIPES_BY_PRODUCTS_FETCH_SUCCEEDED:
      // return action.payload.slice();
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export default suggesterRecipes;
