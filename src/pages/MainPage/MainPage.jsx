import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import css from 'classnames';
import Icon from 'material-ui/Icon';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCarousel from '../../components/RecipeCarousel/RecipeCarousel';
import CoZjescService from '../../services/co-zjesc-service';
import styles from './MainPage.css';

function redirectToSearchPage(query) {
  const encodedQuery = encodeURI(query);
  const redirectUrl = `/search/${encodedQuery}`;
  window.location.assign(redirectUrl);
}

function redirectToRandomRecipe() {
  CoZjescService
    .recipes
    .getRandom()
    .then(id => window.location.assign(`/recipe/${id}`));
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
        <div className={styles['buttons-containers']}>
          <NavLink to="/suggester" className={css(styles['button'], styles['button--left'])}>
            <Icon style={({ fontSize: '110px' })}>lightbulb_outline</Icon>
            Zrób coś do jedzenia z tego co masz w lodówce!
          </NavLink>
          <button className={styles['button']} onClick={() => redirectToRandomRecipe()}>
            <Icon style={({ fontSize: '110px' })}>swap_calls</Icon>
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
