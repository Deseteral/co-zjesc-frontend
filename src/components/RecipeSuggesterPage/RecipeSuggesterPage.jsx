import React from 'react';
import ProductPickerContainer from '../../container/ProductPickerContainer';
import SuggesterRecipeListing from '../../container/SuggesterRecipeListing';

function RecipeSuggesterPage() {
  return (
    <div>
      <ProductPickerContainer />
      <SuggesterRecipeListing />
    </div>
  );
}

export default RecipeSuggesterPage;
