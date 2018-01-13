import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import styles from './SelectedProductsStripe.css';
import commonStyles from '../../common.css';

function SelectedProductsStripe({ selectedProducts, onRemoveProduct }) {
  if (selectedProducts.length === 0) {
    return <div />;
  }

  return (
    <section className={commonStyles['section']}>
      <h3 className={commonStyles['section--header']}>
        Wybrane przez Ciebie produkty
      </h3>
      <ul className={styles['list']}>
        {selectedProducts.map(p => (
          <li key={p.id} className={styles['item']}>
            <i
              className={css('material-icons', styles['button'])}
              onClick={() => onRemoveProduct(p.id)}
              aria-hidden="true"
            >
              close
            </i>
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
  onRemoveProduct: PropTypes.func.isRequired,
};

export default SelectedProductsStripe;
