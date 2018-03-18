import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import { logout } from '../../services/login-service';

class LoggedIn extends Component {
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

  onMyAccountClick() {
    this.onMenuClose();
  }

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
          <MenuItem onClick={() => this.onMyAccountClick()}>
            Moje konto
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
