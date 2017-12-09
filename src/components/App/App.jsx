import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeSuggesterPage from '../RecipeSuggesterPage/RecipeSuggesterPage';
import styles from './App.css';

function App(props) {
  return (
    <Provider store={props.store}>
      <div className={styles['app-container']}>
        <h1 className={styles['title']}>Co zjeść?</h1>
        <div className={styles['container']}>
          <RecipeSuggesterPage />
        </div>
      </div>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
