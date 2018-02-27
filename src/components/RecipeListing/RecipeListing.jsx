import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '../Card/Card';
import SuggesterSection from '../SuggesterSection/SuggesterSection';
import styles from './RecipeListing.css';

function RecipeListing({ recipes }) {
  if (recipes.length === 0) {
    return <div />;
  }

  return (
    <SuggesterSection title="Dobrane przepisy">
      <Card className={styles['card']}>
        {recipes.map(recipe => (
          <li className={styles['item']} key={recipe.id}>
            <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
              {recipe.title}
            </NavLink>
          </li>
        ))}
      </Card>
    </SuggesterSection>
  );
}

RecipeListing.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
};

RecipeListing.defaultProps = {
  recipes: [],
};

export default RecipeListing;
