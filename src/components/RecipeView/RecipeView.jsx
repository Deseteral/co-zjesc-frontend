import React from 'react';

function RecipeView({ recipe }) {
  return <div>{JSON.stringify(recipe, null, 2)}</div>;
}

export default RecipeView;
