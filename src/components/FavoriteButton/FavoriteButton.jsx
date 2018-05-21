import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

/**
 * Button for adding recipe to the favorites.
 * @param {object} props - component props
 */
function FavoriteButton({ active, onClick }) {
  const iconType = active
    ? 'favorite'
    : 'favorite_border';

  const iconStyle = {
    fontSize: '38px',
    color: active ? 'var(--accent-color)' : 'var(--disabled-text-color)',
  };

  return (
    <IconButton onClick={onClick}>
      <Icon style={iconStyle}>
        {iconType}
      </Icon>
    </IconButton>
  );
}

FavoriteButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FavoriteButton.defaultProps = {
  active: false,
};

export default FavoriteButton;
