import React from 'react';
import PropTypes from 'prop-types';
import styles from './SuggesterSection.css';

function SuggesterSection({ title, children }) {
  return (
    <section className={styles['section']}>
      <div className={styles['section--header']}>
        {title}
      </div>
      {children}
    </section>
  );
}

SuggesterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SuggesterSection;
