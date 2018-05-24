/**
 * @module pages/MyFavoritesPage
 */

import React, { Component } from 'react';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';
import SuggesterSection from '../../components/SuggesterSection/SuggesterSection';

/**
 * Component used to render recipe listing with users favorite recipes.
 * It handles fetching recipes for currently logged user.
 */
class MyFavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAllRecipes();
  }

  /**
   * Fetches all recipes and persists them to the state.
   */
  fetchAllRecipes() {
    CoZjescService
      .recipes
      .favorites
      .getAll()
      .then(recipes => this.setState({ recipes, loading: false }));
  }

  render() {
    const { recipes, loading } = this.state;

    if (loading) return (<Spinner />);

    if (recipes) {
      return (
        <RecipeListing
          title="Moje ulubione przepisy"
          recipes={recipes}
        />
      );
    }

    return (
      <SuggesterSection title="Nie dodałeś żadnego przepisu do ulubionych" />
    );
  }
}

export default MyFavoritesPage;

