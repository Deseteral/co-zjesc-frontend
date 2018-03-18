import React from 'react';
import ProductPickerContainer from '../../container/ProductPickerContainer';
import SuggesterRecipeListing from '../../container/SuggesterRecipeListing';
import SelectedProductsStripeContainer from '../../container/SelectedProductsStripeContainer';

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
