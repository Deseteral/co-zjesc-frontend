import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectedProductsStripe.css';

function SelectedProductsStripe({ selectedProducts }) {
  return (
    <ul className={styles['list']}>
      {selectedProducts.map(p => (
        <li key={p.id} className={styles['item']}>
          {p.name}
        </li>
      ))}
    </ul>
  );
}

SelectedProductsStripe.propTypes = {
  selectedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default SelectedProductsStripe;
