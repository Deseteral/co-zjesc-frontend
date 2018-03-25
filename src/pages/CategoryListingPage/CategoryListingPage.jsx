import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';

class CategoryListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: null,
      recipeList: null,
    };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .getByCategoryId(this.props.categoryId)
      .then(recipeList => this.setState({ recipeList }));

    CoZjescService
      .categories
      .get()
      .then((categories) => {
        const categoryName = categories
          .filter(c => c.id === this.props.categoryId)[0]
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
