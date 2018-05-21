/**
 * @module components/RecipeListingItem
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import styles from './RecipeListingItem.css';

/**
 * Redirects to edit page for specified recipe.
 * @param {number} recipeId - ID of the recipe.
 */
function redirectToEditPage(recipeId) {
  window.location.assign(`/recipe/${recipeId}/edit`);
}

/**
 * Recipe item for recipe list.
 * @param {object} props - component props
 */
function RecipeListingItem({ recipe, withEditButton }) {
  return (
    <div className={styles['item']}>
      <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
        {recipe.image && (
          <div
            className={styles['image']}
            style={({ backgroundImage: `url("${recipe.image}")` })}
          />
        )}
        {!recipe.image && (
          <div className={styles['image']}>
            <Icon>broken_image</Icon>
          </div>
        )}
        <div className={styles['text']}>
          {recipe.title}
        </div>
      </NavLink>
      {withEditButton && (
        <div className={styles['left-container']}>
          <IconButton color="primary" onClick={() => redirectToEditPage(recipe.id)}>
            <Icon>mode_edit</Icon>
          </IconButton>
        </div>
      )}
    </div>
  );
}

RecipeListingItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  withEditButton: PropTypes.bool,
};

RecipeListingItem.defaultProps = {
  withEditButton: false,
};

export default RecipeListingItem;
