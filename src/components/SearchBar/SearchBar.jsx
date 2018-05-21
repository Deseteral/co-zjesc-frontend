/**
 * @module components/SearchBar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

/**
 * Search input field component.
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
  }

  /**
   * Handles key press.
   * @param {object} e - key press event
   */
  onKeyPress(e) {
    const { onEnterPress } = this.props;
    const { value } = this.state;
    if (e.key === 'Enter') onEnterPress(value);
  }

  render() {
    return (
      <input
        className={styles['input']}
        value={this.state.value}
        placeholder="Szukaj przepisów!"
        onChange={e => this.setState({ value: e.target.value })}
        onKeyPress={e => this.onKeyPress(e)}
      />
    );
  }
}

SearchBar.propTypes = {
  initialValue: PropTypes.string,
  onEnterPress: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  initialValue: '',
};

export default SearchBar;
