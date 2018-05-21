/**
 * @module components/CategoryDropdown
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import styles from './CategoryDropdown.css';

/**
 * Dropdown menu component.
 */
class CategoryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElement: null,
    };
  }

  /**
   * Handles clicking on the menu button.
   * @param {object} event - click event
   */
  onMenuButtonClick(event) {
    this.setState({ anchorElement: event.currentTarget });
  }

  /**
   * Handles closing the menu.
   */
  onMenuClose() {
    this.setState({ anchorElement: null });
  }

  render() {
    const { anchorElement } = this.state;

    return (
      <div className={styles['container']}>
        <Button
          onClick={e => this.onMenuButtonClick(e)}
          color="primary"
          style={({ paddingLeft: '0', paddingRight: '8px' })}
        >
          <Icon>keyboard_arrow_down</Icon>
          Kategorie
        </Button>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={() => this.onMenuClose()}
        >
          {this.props.categories.map(c => (
            <MenuItem
              key={c.id}
              component={NavLink}
              className={styles['item-link']}
              to={`/category/${c.id}`}
              onClick={() => this.onMenuClose()}
            >
              {c.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryDropdown;
