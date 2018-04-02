import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './RecipeListingItem.css';

function RecipeListingItem({ recipe }) {
  return (
    <NavLink to={`/recipe/${recipe.id}`} className={styles['item']}>
      <div
        className={styles['image']}
        style={({ backgroundImage: `url("${recipe.image}")` })}
      />
      <div className={styles['text']}>
        {recipe.title}
      </div>
    </NavLink>
  );
}

RecipeListingItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default RecipeListingItem;
