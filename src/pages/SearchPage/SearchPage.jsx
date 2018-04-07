import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import CoZjescService from '../../services/co-zjesc-service';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: props.query,
    };
  }

  componentDidMount() {
    if (this.state.query !== '') {
      this.refreshRecipes(this.state.query);
    }
  }

  onEnterPress(query) {
    this.setState({ query });
    this.refreshRecipes(query);
  }

  refreshRecipes(query) {
    CoZjescService
      .recipes
      .search(query)
      .then(recipes => this.setState({ recipes }));
  }

  render() {
    return (
      <Fragment>
        <SearchBar
          initialValue={this.props.query}
          onEnterPress={query => this.onEnterPress(query)}
        />
        <RecipeListing
          title="Wyniki wyszukiwania"
          recipes={this.state.recipes}
        />
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
