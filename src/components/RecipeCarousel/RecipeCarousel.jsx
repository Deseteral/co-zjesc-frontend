import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import Siema from 'react-siema';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Card from '../Card/Card';
import RecipeTile from '../RecipeTile/RecipeTile';
import styles from './RecipeCarousel.css';

function calculatePerPage(width) {
  if (width <= 320) return 1;
  if (width <= 470) return 2;
  return 3;
}

class RecipeCarousel extends Component {
  constructor(props) {
    super(props);
    this.siema = null;
  }

  render() {
    const { title, recipes } = this.props;

    if (recipes.length === 0) {
      return null;
    }

    return (
      <Card className={styles['card']}>
        {title && (
          <div className={styles['title']}>{title}</div>
        )}
        <div className={styles['slider-container']}>
          <Siema
            ref={(q) => { this.siema = q; }}
            perPage={calculatePerPage(window.innerWidth)}
            loop
          >
            {recipes.map(recipe => (
              <RecipeTile
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                imageUrl={recipe.image}
                rating={recipe.averageRate}
              />
            ))}
          </Siema>
          {[
            { side: 'left', action: 'prev' },
            { side: 'right', action: 'next' },
          ].map(({ side, action }) => (
            <div
              key={side}
              className={css(styles['nav-button'], styles[`nav-button--${side}`])}
            >
              <Button
                variant="fab"
                mini
                color="primary"
                onClick={() => this.siema[action]()}
              >
                <Icon>{`keyboard_arrow_${side}`}</Icon>
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  }
}

RecipeCarousel.propTypes = {
  title: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RecipeCarousel.defaultProps = {
  title: null,
};

export default RecipeCarousel;
