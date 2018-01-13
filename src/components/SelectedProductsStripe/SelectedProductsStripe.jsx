import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectedProductsStripe.css';
import commonStyles from '../../common.css';

function SelectedProductsStripe({ selectedProducts }) {
  return (
    <section className={commonStyles['section']}>
      <h3 className={commonStyles['section--header']}>
        Wybrane przez Ciebie produkty
      </h3>
      <ul className={styles['list']}>
        {selectedProducts.map(p => (
          <li key={p.id} className={styles['item']}>
            {p.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

SelectedProductsStripe.propTypes = {
  selectedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default SelectedProductsStripe;
