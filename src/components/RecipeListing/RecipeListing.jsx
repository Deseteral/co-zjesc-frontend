import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecipeListing.css';
import commonStyles from '../../common.css';

function RecipeListing({ recipes }) {
  if (recipes.length === 0) {
    return <div />;
  }

  return (
    <section className={commonStyles['section']}>
      <h3 className={commonStyles['section--header']}>
        Dobrane przepisy
      </h3>
      <ul className={styles['card']}>
        {recipes.map(recipe => (
          <li className={styles['item']} key={recipe.id}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </section>
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
