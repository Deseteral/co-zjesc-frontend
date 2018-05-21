import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import SuggesterSection from '../SuggesterSection/SuggesterSection';
import styles from './RecipeListing.css';
import RecipeListingItem from '../RecipeListingItem/RecipeListingItem';

function Container({ title, children }) { // eslint-disable-line react/prop-types
  return title
    ? <SuggesterSection title={title}>{children}</SuggesterSection>
    : children;
}

/**
 * Component that renders list of recipes.
 * @param {object} props - component props
 */
function RecipeListing({ title, recipes, withEditButtons }) {
  if (recipes.length === 0) {
    return <div />;
  }

  return (
    <Container title={title}>
      <Card className={styles['card']}>
        {recipes.map(recipe => (
          <RecipeListingItem
            recipe={recipe}
            withEditButton={withEditButtons}
            key={recipe.id}
          />
        ))}
      </Card>
    </Container>
  );
}

RecipeListing.propTypes = {
  title: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object),
  withEditButtons: PropTypes.bool,
};

RecipeListing.defaultProps = {
  title: null,
  recipes: [],
  withEditButtons: false,
};

export default RecipeListing;
