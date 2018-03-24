import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '../Card/Card';
import SuggesterSection from '../SuggesterSection/SuggesterSection';
import styles from './RecipeListing.css';

function Container({ title, children }) { // eslint-disable-line react/prop-types
  return title
    ? <SuggesterSection title={title}>{children}</SuggesterSection>
    : children;
}

function RecipeListing({ title, recipes }) {
  if (recipes.length === 0) {
    return <div />;
  }

  return (
    <Container title={title}>
      <Card className={styles['card']}>
        {recipes.map(recipe => (
          <li className={styles['item']} key={recipe.id}>
            <NavLink to={`/recipe/${recipe.id}`} className={styles['link']}>
              {recipe.title}
            </NavLink>
          </li>
        ))}
      </Card>
    </Container>
  );
}

RecipeListing.propTypes = {
  title: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object),
};

RecipeListing.defaultProps = {
  title: null,
  recipes: [],
};

export default RecipeListing;
