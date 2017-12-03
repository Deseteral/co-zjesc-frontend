import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import css from 'classnames';
import styles from './ProductPicker.css';

class ProductPicker extends Component {
  static renderItem(item, highlighted) {
    const className = css(
      styles['item'],
      highlighted ? styles['item--highlighted'] : null,
    );

    return (
      <div className={className}>
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
  }

  render() {
    return (
      <div>
        <Autocomplete
          items={this.props.products}
          getItemValue={item => item.name}
          renderItem={(item, highlighted) => (
            ProductPicker.renderItem(item, highlighted)
          )}
          renderInput={props => (
            <input className={styles['input']} {...props} />
          )}
          renderMenu={(items, value, style) => (
            <div style={style} className={styles['menu']}>{items}</div>
          )}
          value={this.state.currentValue}
          onChange={e => this.setState({ currentValue: e.target.value })}
          onSelect={value => this.addProductByValue(value)}
          wrapperStyle={({
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          })}
        />
        <ul>
          {this.state.selectedProducts.map(p => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
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
};

export default ProductPicker;
