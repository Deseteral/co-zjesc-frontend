import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeView from '../RecipeView/RecipeView';
import CoZjescService from '../../services/co-zjesc-service';

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
      return (<div>spinner</div>);
    }

    return (<RecipeView recipe={this.state.recipe} />);
  }
}

RecipeViewPage.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default RecipeViewPage;
