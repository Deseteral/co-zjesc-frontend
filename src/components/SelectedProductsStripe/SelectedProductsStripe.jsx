import React from 'react';
import css from 'classnames';
import Card from '../Card/Card';
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
      <Card className={styles['card']}>
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
      </Card>
    </section>
  );
}

export default SelectedProductsStripe;
