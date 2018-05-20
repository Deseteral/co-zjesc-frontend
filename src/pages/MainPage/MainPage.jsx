/**
 * @module pages/MainPage
 */

import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import css from 'classnames';
import Icon from 'material-ui/Icon';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCarousel from '../../components/RecipeCarousel/RecipeCarousel';
import CoZjescService from '../../services/co-zjesc-service';
import styles from './MainPage.css';

/**
 * Redirects search results page for given query.
 * @param {string} query - search query
 */
function redirectToSearchPage(query) {
  const encodedQuery = encodeURI(query);
  const redirectUrl = `/search/${encodedQuery}`;
  window.location.assign(redirectUrl);
}

/**
 * Fetches random recipe id and redirects to its page.
 */
function redirectToRandomRecipe() {
  CoZjescService
    .recipes
    .getRandom()
    .then(id => window.location.assign(`/recipe/${id}`));
}

/**
 * Component used to render main page.
 */
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousels: [],
    };
  }

  componentDidMount() {
    this.fetchCarousels();
  }

  /**
   * Used to fetch and save list of carouserls to the state.
   */
  fetchCarousels() {
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
        <div className={styles['buttons-containers']}>
          <NavLink to="/suggester" className={css(styles['button'], styles['button--left'])}>
            <Icon style={({ fontSize: '110px', marginBottom: '16px' })}>lightbulb_outline</Icon>
            Zrób coś do jedzenia z tego co masz w lodówce!
          </NavLink>
          <button className={styles['button']} onClick={() => redirectToRandomRecipe()}>
            <Icon style={({ fontSize: '110px', marginBottom: '16px' })}>swap_calls</Icon>
            Losowy przepis!
          </button>
        </div>
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
