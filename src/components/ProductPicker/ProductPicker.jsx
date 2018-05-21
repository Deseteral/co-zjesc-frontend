/**
 * @module components/ProductPicker
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import css from 'classnames';
import styles from './ProductPicker.css';

/**
 * Suggester's product picker.
 */
class ProductPicker extends Component {
  /**
   * Returns picker list element.
   * @param {object} item - an item to render
   * @param {boolean} highlighted - is this item highlighted
   */
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
    };

    this.inputElement = null;
  }

  componentDidMount() {
    this.inputElement = document.getElementById('product-picker-input');
  }

  componentWillReceiveProps(nextProps) {
    this.refreshSuggestedProducts(nextProps.selectedProducts);
  }

  addProductByValue(value) {
    const newProduct = this.props.products.find(p => p.name === value);
    this.props.addSelectedProduct(newProduct);
    this.setState({ currentValue: '' });
    this.inputElement.blur();
  }

  refreshSuggestedProducts(selectedProducts) {
    const selectedProductsIds = selectedProducts.map(s => s.id);
    this.props.getSuggestedProducts(selectedProductsIds);
  }

  render() {
    const renderItems = this.props
      .products
      .filter(p => !this.props.selectedProducts.find(s => s.id === p.id));

    return (
      <div>
        <Autocomplete
          items={renderItems}
          getItemValue={item => item.name}
          renderItem={(item, highlighted) => (
            ProductPicker.renderItem(item, highlighted)
          )}
          renderInput={props => (
            <input id="product-picker-input" className={styles['input']} {...props} />
          )}
          renderMenu={(items, value, defaultStyle) => {
            const style = {
              top: defaultStyle.top,
              width: this.inputElement.offsetWidth,
              left: this.inputElement.offsetLeft,
            };
            return (
              <div style={style} className={styles['menu-wrapper']}>
                <div className={styles['menu']}>{items}</div>
              </div>
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
      </div>
    );
  }
}

ProductPicker.propTypes = {
  selectedProducts: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  getSuggestedProducts: PropTypes.func.isRequired,
  addSelectedProduct: PropTypes.func.isRequired,
};

ProductPicker.defaultProps = {
  selectedProducts: [],
  products: [],
};

export default ProductPicker;
