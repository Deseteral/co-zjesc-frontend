/**
 * @module container/SelectedProductsStripeContainer
 */

import { connect } from 'react-redux';
import SelectedProductsStripe from '../components/SelectedProductsStripe/SelectedProductsStripe';
import { removeProduct } from '../actions/selected-products';

function mapStateToProps(state) {
  return {
    selectedProducts: state.selectedProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRemoveProduct: productId => dispatch(removeProduct(productId)),
  };
}

const SelectedProductsStripeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedProductsStripe);


/**
 * SelectedProductsStripe component connected to the application store
 */
export default SelectedProductsStripeContainer;
