import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import styles from './CategoryDropdown.css';

const categories = [
  {
    id: 1,
    name: 'Ciasta',
  }, {
    id: 2,
    name: 'Zupy',
  }, {
    id: 3,
    name: 'Wygłupy',
  }, {
    id: 4,
    name: 'Pierniki',
  }, {
    id: 5,
    name: 'Burgery',
  }, {
    id: 6,
    name: 'Pizze',
  }, {
    id: 7,
    name: 'Pierogi',
  },
];

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElement: null,
    };
  }

  onMenuButtonClick(event) {
    this.setState({ anchorElement: event.currentTarget });
  }

  onMenuClose() {
    this.setState({ anchorElement: null });
  }

  render() {
    const { anchorElement } = this.state;

    return (
      <div>
        <Button
          onClick={e => this.onMenuButtonClick(e)}
          color="primary"
        >
          <Icon>keyboard_arrow_down</Icon>
          Kategorie
        </Button>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={() => this.onMenuClose()}
        >
          {categories.map(c => (
            <MenuItem
              key={c.id}
              component={NavLink}
              className={styles['item-link']}
              to={`/categories/${c.id}`}
            >
              {c.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default CategoryDropdown;
