import { connect } from 'react-redux';
import ProductPicker from '../components/ProductPicker/ProductPicker';
import { recipesByProductsFetch } from '../actions/recipes-by-products';

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSuggestedProducts: productIds => dispatch(recipesByProductsFetch(productIds)),
  };
}

const ProductPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPicker);

export default ProductPickerContainer;
