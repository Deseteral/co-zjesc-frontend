import React from 'react';

function RecipeView({ recipe }) { // eslint-disable-line
  return <div>{JSON.stringify(recipe, null, 2)}</div>;
}

export default RecipeView;
