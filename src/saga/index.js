/**
 * @module saga/index
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import CoZjescService from '../services/co-zjesc-service';
import {
  productsFetchSucceeded,
  productsFetchFailed,
  PRODUCTS_FETCH_REQUESTED,
} from '../actions/products';
import {
  recipesByProductsFetchSucceeded,
  recipesByProductsFetchFailed,
  RECIPES_BY_PRODUCTS_FETCH_REQUESTED,
} from '../actions/recipes-by-products';

/**
 * When requested calls service to get product list and dispatches action when finished.
 */
function* fetchProducts() {
  try {
    const products = yield call(CoZjescService.products.get);
    yield put(productsFetchSucceeded(products));
  } catch (e) {
    yield put(productsFetchFailed(e.message));
  }
}

/**
 * When requested calls service to get recipes from suggester and dispatches action when finished.
 * @param {object} action - redux standard action
 */
function* fetchRecipesByProducts(action) {
  try {
    const productIds = action.payload;
    const recipes = yield call(CoZjescService.recipes.getByProducts, productIds);
    yield put(recipesByProductsFetchSucceeded(recipes));
  } catch (e) {
    yield put(recipesByProductsFetchFailed(e.message));
  }
}

function* saga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchProducts);
  yield takeEvery(RECIPES_BY_PRODUCTS_FETCH_REQUESTED, fetchRecipesByProducts);
}

export default saga;
