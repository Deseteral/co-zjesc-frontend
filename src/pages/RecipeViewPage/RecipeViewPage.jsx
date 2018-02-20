import React, { Component } from 'react';
import RecipeView from '../../components/RecipeView/RecipeView';
import Spinner from '../../components/Spinner/Spinner';
import mapRecipeToProps from '../../mappers/map-recipe-to-props';
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
      return (<Spinner />);
    }

    const data = mapRecipeToProps(this.state.recipe);

    return (<RecipeView {...data} />);
  }
}

export default RecipeViewPage;
