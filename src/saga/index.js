import { call, put, takeEvery } from 'redux-saga/effects';
import CoZjescService from '../services/co-zjesc-service';
import {
  productsFetchSucceeded,
  productsFetchFailed,
  PRODUCTS_FETCH_REQUESTED,
} from '../actions/products';

function* fetchProducts() {
  try {
    const products = yield call(CoZjescService.products.get);
    yield put(productsFetchSucceeded(products));
  } catch (e) {
    yield put(productsFetchFailed(e.message));
  }
}

function* saga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchProducts);
}

export default saga;
