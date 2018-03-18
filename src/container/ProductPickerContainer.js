import { connect } from 'react-redux';
import ProductPicker from '../components/ProductPicker/ProductPicker';
import { recipesByProductsFetch } from '../actions/recipes-by-products';
import { addProduct } from '../actions/selected-products';

function mapStateToProps(state) {
  return {
    selectedProducts: state.selectedProducts,
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSuggestedProducts: productIds => dispatch(recipesByProductsFetch(productIds)),
    addSelectedProduct: product => dispatch(addProduct(product)),
  };
}

const ProductPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPicker);

export default ProductPickerContainer;
