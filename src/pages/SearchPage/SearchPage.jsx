/**
 * @module pages/SearchPage
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import Spinner from '../../components/Spinner/Spinner';
import CoZjescService from '../../services/co-zjesc-service';
import styles from './SearchPage.css';

/**
 * Search page form component.
 * It handles fetching recipes and rendering them.
 */
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: props.query || '',
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.state.query !== '') {
      this.refreshRecipes(this.state.query);
    }
  }

  /**
   * Handle enter key press on search input.
   * @param {string} query - search query
   */
  onEnterPress(query) {
    this.setState({ query });
    this.refreshRecipes(query);
  }

  /**
   * Fetches new recipes that match given search query and persists them to the state.
   * @param {string} query - search query
   */
  refreshRecipes(query) {
    this.setState({ isLoading: true });

    CoZjescService
      .recipes
      .search(query)
      .then(recipes => this.setState({ recipes, isLoading: false }));
  }

  render() {
    const { query } = this.props;
    const { recipes, isLoading } = this.state;

    return (
      <Fragment>
        <SearchBar
          initialValue={query}
          onEnterPress={value => this.onEnterPress(value)}
        />
        {isLoading && (
          <Spinner />
        )}
        {(!isLoading && recipes.length > 0) && (
          <RecipeListing
            title="Wyniki wyszukiwania"
            recipes={recipes}
          />
        )}
        {(!isLoading && recipes.length === 0 && query !== '') && (
          <div className={styles['no-results']}>
            Brak przepisów dla podanej frazy
          </div>
        )}
      </Fragment>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
};

SearchPage.defaultProps = {
  query: '',
};

export default SearchPage;
