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
      carousels: [],
    };
  }

  componentDidMount() {
    CoZjescService
      .carousels
      .get()
      .then(carousels => this.setState({ carousels }));
  }

  render() {
    const { carousels } = this.state;

    return (
      <Fragment>
        <SearchBar
          onEnterPress={query => redirectToSearchPage(query)}
        />
        {carousels.map(carousel => (
          <RecipeCarousel
            key={carousel.name}
            title={carousel.name}
            recipes={carousel.recipes}
          />
        ))}
      </Fragment>
    );
  }
}

export default MainPage;
