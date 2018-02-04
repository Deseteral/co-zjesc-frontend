import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeView from '../RecipeView/RecipeView';
import CoZjescService from '../../services/co-zjesc-service';
import styles from './RecipeViewPage.css';

function mapDifficultyLevel(level) {
  if (level === 1) return 'bardzo łatwy';
  if (level === 2) return 'łatwy';
  if (level === 3) return 'średni';
  if (level === 4) return 'trudny';
  if (level === 5) return 'bardzo trudny';
  return null;
}

// TODO: Foolproof it!
// TODO: Move it!
function mapRecipeToProps(recipe) {
  const { id, title, description, tags } = recipe;

  const images = recipe
    .images
    .map(i => ({ original: `${SERVICE_URL}${i}` }));

  const products = recipe
    .products
    .map(p => ({ id: p.id, label: `${p.name} ${p.amount}${p.unit.label}` }));

  const tiles = [
    { title: 'stopień trudności', value: mapDifficultyLevel(recipe.difficulty) },
    { title: 'koszt', value: `ok. ${recipe.estimatedCost}zł` },
    { title: 'liczba porcji', value: `${recipe.portionCount}` },
    { title: 'czas przygotowania', value: `${recipe.timeToPrepare}m` },
  ].map((t, i) => ({ id: i, ...t }));

  return {
    id,
    title,
    images,
    products,
    description,
    tiles,
    tags,
  };
}

class RecipeViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .getById(this.props.recipeId)
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    if (!this.state.recipe) {
      return (<div className={styles['loader']}>Wczytywanie...</div>);
    }

    const data = mapRecipeToProps(this.state.recipe);

    return (<RecipeView {...data} />);
  }
}

RecipeViewPage.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default RecipeViewPage;
