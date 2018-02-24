import React from 'react';
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

export default Card;
