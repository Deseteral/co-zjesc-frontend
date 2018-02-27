import React from 'react';
import PropTypes from 'prop-types';
import styles from './SuggesterSection.css';

function SuggesterSection({ title, children }) {
  return (
    <section className={styles['section']}>
      <h3 className={styles['section--header']}>
        {title}
      </h3>
      {children}
    </section>
  );
}

SuggesterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SuggesterSection;
