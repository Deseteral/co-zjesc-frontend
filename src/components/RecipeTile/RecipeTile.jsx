/**
 * @module components/RecipeTile
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import Button from 'material-ui/Button';
import styles from './RecipeTile.css';

/**
 * Redirects to recipe view specified by its ID.
 * @param {number} id - ID of the recipe
 */
function redirectToRecipeView(id) {
  const recipeUrl = `/recipe/${id}`;
  window.location.assign(recipeUrl);
}

/**
 * Single recipe information tile.
 * @param {object} props - component props
 */
function RecipeTile({ id, title, imageUrl, rating }) {
  return (
    <div className={styles['tile']}>
      <div
        style={({ backgroundImage: `url("${imageUrl}")` })}
        className={styles['photo']}
      />
      <ReactStars
        count={5}
        value={rating}
        size={21}
        edit={false}
        half={false}
        color1="var(--disabled-text-color)"
        color2="var(--accent-color)"
      />
      <div className={styles['title']}>
        {title}
      </div>
      <Button
        fullWidth
        color="primary"
        onClick={() => redirectToRecipeView(id)}
      >
        Zobacz
      </Button>
    </div>
  );
}

RecipeTile.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default RecipeTile;
