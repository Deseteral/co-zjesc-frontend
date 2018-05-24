/**
 * @module pages/MyRecipesPage
 */

import React, { Component } from 'react';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';
import SuggesterSection from '../../components/SuggesterSection/SuggesterSection';

/**
 * Component used to render recipe listing with recipes added by logged user.
 * This component handles fetching that list.
 */
class MyRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUserRecipes();
  }

  /**
   * Fetch recipes submited by currently logged-in user and persist them to the state.
   */
  fetchUserRecipes() {
    CoZjescService
      .recipes
      .getFromCurrentUser()
      .then(recipes => this.setState({ recipes, loading: false }));
  }

  render() {
    const { recipes, loading } = this.state;

    if (loading) return (<Spinner />);

    if (recipes) {
      return (
        <RecipeListing
          title="Moje przepisy"
          recipes={recipes}
          withEditButtons
        />
      );
    }

    return (
      <SuggesterSection title="Nie dodałeś żadnych przepisów" />
    );
  }
}

export default MyRecipesPage;
