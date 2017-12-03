import { connect } from 'react-redux';
import ProductPicker from '../components/ProductPicker/ProductPicker';

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps() {
  return {};
}

const ProductPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPicker);

export default ProductPickerContainer;
