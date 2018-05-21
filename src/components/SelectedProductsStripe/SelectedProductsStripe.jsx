import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import Card from '../Card/Card';
import SuggesterSection from '../SuggesterSection/SuggesterSection';
import styles from './SelectedProductsStripe.css';

/**
 * Renders products selected as input for the recipe suggester.
 * @param {object} props - component props
 */
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

SelectedProductsStripe.propTypes = {
  selectedProducts: PropTypes.arrayOf(PropTypes.object),
  onRemoveProduct: PropTypes.func.isRequired,
};

SelectedProductsStripe.defaultProps = {
  selectedProducts: [],
};

export default SelectedProductsStripe;
