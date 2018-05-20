/**
 * @module pages/CategoryListingPage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';

/**
 * Component used to render recipe listing in specified category.
 * It is capable of rendering loading spinner while fetching recipes and category name.
 */
class CategoryListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: null,
      recipeList: null,
    };
  }

  componentDidMount() {
    this.fetchRecipeList(this.props.categoryId);
    this.fetchCategoryName(this.props.categoryId);
  }

  componentWillReceiveProps(props, nextProps) {
    const categoryId = nextProps.categoryId || props.categoryId;
    this.fetchRecipeList(categoryId);
    this.fetchCategoryName(categoryId);
  }

  /**
   * Fetches recipes and saves result to the state.
   * @param {number} categoryId - ID of category to fetch recipes from.
   */
  fetchRecipeList(categoryId) {
    CoZjescService
      .recipes
      .getByCategoryId(categoryId)
      .then(recipeList => this.setState({ recipeList }));
  }

  /**
   * Fetches category name and saves it to the state.
   * @param {number} categoryId - ID of category to fetch recipes from.
   */
  fetchCategoryName(categoryId) {
    CoZjescService
      .categories
      .get()
      .then((categories) => {
        const categoryName = categories
          .filter(c => c.id === categoryId)[0]
          .name
          .toLowerCase();

        this.setState({ categoryName });
      });
  }

  render() {
    const { recipeList, categoryName } = this.state;
    if (!recipeList || !categoryName) {
      return (<Spinner />);
    }

    return (
      <RecipeListing
        title={`Przepisy w kategorii ${categoryName}`}
        recipes={recipeList}
      />
    );
  }
}

CategoryListingPage.propTypes = {
  categoryId: PropTypes.number.isRequired,
};

export default CategoryListingPage;
