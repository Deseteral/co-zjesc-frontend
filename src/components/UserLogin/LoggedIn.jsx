import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import { logout } from '../../services/login-service';

/**
 * User login component for logged in user.
 */
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElement: null,
    };
  }

  /**
   * Handles menu button click.
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

  /**
   * Handles clicking on the my favorites item.
   */
  onMyFavoritesClick() {
    window.location.assign('/my-favorites');
    this.onMenuClose();
  }

  /**
   * Handles clicking on the my recipes item.
   */
  onMyRecipesClick() {
    window.location.assign('/my-recipes');
    this.onMenuClose();
  }

  /**
   * Handles clicking on the add new recipe item.
   */
  onAddRecipeClick() {
    window.location.assign('/recipe/add');
    this.onMenuClose();
  }

  /**
   * Handles clicking on the logout item.
   */
  onLogoutClick() {
    logout();
    this.onMenuClose();
  }

  render() {
    const { className, username } = this.props;
    const { anchorElement } = this.state;
    const hasUsername = (username !== '');

    return (
      <div className={className}>
        {hasUsername && (<div>Witaj, {username}!</div>)}
        <IconButton onClick={e => this.onMenuButtonClick(e)}>
          <Icon>keyboard_arrow_down</Icon>
        </IconButton>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={() => this.onMenuClose()}
        >
          <MenuItem onClick={() => this.onMyFavoritesClick()}>
            Moje ulubione
          </MenuItem>
          <MenuItem onClick={() => this.onMyRecipesClick()}>
            Moje przepisy
          </MenuItem>
          <MenuItem onClick={() => this.onAddRecipeClick()}>
            Dodaj przepis
          </MenuItem>
          <MenuItem onClick={() => this.onLogoutClick()}>
            Wyloguj
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

LoggedIn.propTypes = {
  username: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default LoggedIn;
