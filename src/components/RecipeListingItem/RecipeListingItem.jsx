import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './RecipeListingItem.css';

function RecipeListingItem({ recipe }) {
  return (
    <li className={styles['item']}>
      <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
        {recipe.title}
      </NavLink>
    </li>
  );
}

RecipeListingItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default RecipeListingItem;
