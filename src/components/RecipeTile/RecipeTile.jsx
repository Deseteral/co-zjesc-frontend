import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import styles from './RecipeTile.css';

function redirectToRecipeView(id) {
  const recipeUrl = `/recipe/${id}`;
  window.location.assign(recipeUrl);
}

function RecipeTile({ id, title, imageUrl }) {
  return (
    <div className={styles['tile']}>
      <div
        style={({ backgroundImage: `url("${imageUrl}")` })}
        className={styles['photo']}
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
};

export default RecipeTile;
