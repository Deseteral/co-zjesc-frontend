/**
 * @module pages/EditRecipePage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';
import RecipeEditor from '../../components/RecipeEditor/RecipeEditor';

/**
 * Component used to render recipe editor for specified recipe.
 * It automatically fetches recipe data.
 */
class EditRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: null };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .getById(this.props.id)
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    const { recipe } = this.state;
    if (!recipe) {
      return (<Spinner />);
    }

    return (<RecipeEditor {...recipe} />);
  }
}

EditRecipePage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EditRecipePage;
