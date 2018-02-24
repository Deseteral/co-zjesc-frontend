import React from 'react';
import css from 'classnames';
import Card from '../Card/Card';
import SuggesterSection from '../SuggesterSection/SuggesterSection';
import styles from './SelectedProductsStripe.css';
import commonStyles from '../../common.css';

function SelectedProductsStripe({ selectedProducts, onRemoveProduct }) {
  if (selectedProducts.length === 0) {
    return <div />;
  }

  return (
    <SuggesterSection title="Wybrane przez Ciebie produkty">
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
    </SuggesterSection>
  );
}

export default SelectedProductsStripe;
