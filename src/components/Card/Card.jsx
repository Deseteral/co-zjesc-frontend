import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import styles from './Card.css';

function Card({ className, children }) {
  const cardClassName = css(
    styles['card'],
    className,
  );

  return (
    <div className={cardClassName}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  className: null,
};

export default Card;
