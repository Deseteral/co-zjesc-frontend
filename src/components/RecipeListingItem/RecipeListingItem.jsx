import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './RecipeListingItem.css';

function RecipeListingItem({ recipe }) {
  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={({ backgroundImage: `url("${recipe.image}")` })}
      />
      <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
        {recipe.title}
      </NavLink>
    </div>
  );
}

RecipeListingItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default RecipeListingItem;
