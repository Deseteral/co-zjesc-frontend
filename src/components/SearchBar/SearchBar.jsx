import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onKeyPress(e) {
    const { onEnterPress } = this.props;
    const { value } = this.state;
    if (e.key === 'Enter') onEnterPress(value);
  }

  render() {
    return (
      <input
        className={styles['input']}
        placeholder="Szukaj przepisów!"
        onChange={e => this.setState({ value: e.target.value })}
        onKeyPress={e => this.onKeyPress(e)}
      />
    );
  }
}

SearchBar.propTypes = {
  onEnterPress: PropTypes.func.isRequired,
};

export default SearchBar;
