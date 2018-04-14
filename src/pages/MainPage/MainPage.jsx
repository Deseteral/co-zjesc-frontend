import React, { Component, Fragment } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCarousel from '../../components/RecipeCarousel/RecipeCarousel';
import CoZjescService from '../../services/co-zjesc-service';

function redirectToSearchPage(query) {
  const encodedQuery = encodeURI(query);
  const redirectUrl = `/search/${encodedQuery}`;
  window.location.assign(redirectUrl);
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testRecipes: [],
    };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .search('test')
      .then(recipes => this.setState({ testRecipes: recipes }));
  }

  render() {
    return (
      <Fragment>
        <SearchBar
          onEnterPress={query => redirectToSearchPage(query)}
        />
        <RecipeCarousel recipes={this.state.testRecipes} />
      </Fragment>
    );
  }
}

export default MainPage;
