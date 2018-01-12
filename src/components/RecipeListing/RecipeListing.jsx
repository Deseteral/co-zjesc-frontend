import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecipeListing.css';

function RecipeListing({ recipes }) {
  return (
    <ul className={styles['card']}>
      {recipes.map(recipe => (
        <li className={styles['item']} key={recipe.id}>
          {recipe.title}
        </li>
      ))}
    </ul>
  );
}

RecipeListing.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

RecipeListing.defaultProps = {
  recipes: [],
};

export default RecipeListing;
