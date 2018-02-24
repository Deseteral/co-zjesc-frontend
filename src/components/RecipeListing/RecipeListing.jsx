import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../Card/Card';
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
      <Card className={styles['card']}>
        {recipes.map(recipe => (
          <li className={styles['item']} key={recipe.id}>
            <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
              {recipe.title}
            </NavLink>
          </li>
        ))}
      </Card>
    </section>
  );
}

RecipeListing.defaultProps = {
  recipes: [],
};

export default RecipeListing;
