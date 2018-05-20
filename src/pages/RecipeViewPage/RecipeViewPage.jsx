/**
 * @module pages/RecipeViewPage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeView from '../../components/RecipeView/RecipeView';
import Spinner from '../../components/Spinner/Spinner';
import mapRecipeToProps from '../../mappers/map-recipe-to-props';
import CoZjescService from '../../services/co-zjesc-service';

/**
 * Component used to fetch and render recipe.
 */
class RecipeViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }

  componentDidMount() {
    this.fetchRecipeById(this.props.recipeId);
  }

  /**
   * Fetch recipe data by its ID and persist it to the state.
   * @param {number} id - recipe ID
   */
  fetchRecipeById(id) {
    CoZjescService
      .recipes
      .getById(id)
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    if (!this.state.recipe) {
      return (<Spinner />);
    }

    const data = mapRecipeToProps(this.state.recipe);

    return (<RecipeView {...data} />);
  }
}

RecipeViewPage.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default RecipeViewPage;
