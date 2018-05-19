/**
 * @module pages/RecipeSuggesterPage
 */

import React from 'react';
import ProductPickerContainer from '../../container/ProductPickerContainer';
import SuggesterRecipeListing from '../../container/SuggesterRecipeListing';
import SelectedProductsStripeContainer from '../../container/SelectedProductsStripeContainer';

/**
 * Component that render suggester page.
 * Renders picker with selected products and recipe listing for suggested recipes.
 */
function RecipeSuggesterPage() {
  return (
    <div>
      <ProductPickerContainer />
      <SelectedProductsStripeContainer />
      <SuggesterRecipeListing />
    </div>
  );
}

export default RecipeSuggesterPage;
