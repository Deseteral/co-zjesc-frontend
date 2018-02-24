import React from 'react';
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

export default SuggesterSection;
