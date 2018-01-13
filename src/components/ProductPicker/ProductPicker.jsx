import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import css from 'classnames';
import SelectedProductsStripe from '../SelectedProductsStripe/SelectedProductsStripe';
import styles from './ProductPicker.css';

class ProductPicker extends Component {
  static renderItem(item, highlighted) {
    const className = css(
      styles['item'],
      highlighted ? styles['item--highlighted'] : null,
    );

    return (
      <div key={item.id} className={className}>
        {item.name}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      selectedProducts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  addProductByValue(value) {
    const newProduct = this.props.products.find(p => p.name === value);
    const selectedProducts = [...this.state.selectedProducts, newProduct];
    this.setState({
      currentValue: '',
      selectedProducts,
    });

    this.refreshSuggestedProducts(selectedProducts);
  }

  removeProduct(id) {
    const selectedProducts = this.state.selectedProducts.slice();
    const removeIndex = selectedProducts.findIndex(p => p.id === id);
    selectedProducts.splice(removeIndex, 1);

    this.setState({ selectedProducts });
    this.refreshSuggestedProducts(selectedProducts);
  }

  refreshSuggestedProducts(selectedProducts) {
    const selectedProductsIds = selectedProducts.map(s => s.id);
    this.props.getSuggestedProducts(selectedProductsIds);
  }

  render() {
    const items = this.props.products
      .filter(p => !this.state.selectedProducts.find(s => s.id === p.id));

    return (
      <div>
        <Autocomplete
          items={items}
          getItemValue={item => item.name}
          renderItem={(item, highlighted) => (
            ProductPicker.renderItem(item, highlighted)
          )}
          renderInput={props => (
            <input id="product-picker-input" className={styles['input']} {...props} />
          )}
          renderMenu={(items, value, defaultStyle) => {
            const input = document.getElementById('product-picker-input');
            const style = {
              top: defaultStyle.top,
              width: input.offsetWidth,
              left: input.offsetLeft,
            };
            return (
              <div style={style} className={styles['menu']}>{items}</div>
            );
          }}
          value={this.state.currentValue}
          onChange={e => this.setState({ currentValue: e.target.value })}
          onSelect={value => this.addProductByValue(value)}
          wrapperStyle={({
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          })}
          inputProps={({
            placeholder: 'Wpisz nazwę składnika...',
          })}
        />
        <SelectedProductsStripe
          selectedProducts={this.state.selectedProducts}
          onRemoveProduct={id => this.removeProduct(id)}
        />
      </div>
    );
  }
}

ProductPicker.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
  getSuggestedProducts: PropTypes.func.isRequired,
};

export default ProductPicker;
