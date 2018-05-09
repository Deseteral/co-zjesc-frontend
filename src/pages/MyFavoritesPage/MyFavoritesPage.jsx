import React, { Component } from 'react';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import CoZjescService from '../../services/co-zjesc-service';
import SuggesterSection from '../../components/SuggesterSection/SuggesterSection';

class MyFavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
    };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .favorites
      .getAll()
      .then(recipes => this.setState({ recipes }));
  }

  render() {
    const { recipes } = this.state;

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
