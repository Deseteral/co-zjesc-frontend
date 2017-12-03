import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ProductPickerContainer from '../../container/ProductPickerContainer';
import styles from './App.css';

function App(props) {
  return (
    <Provider store={props.store}>
      <div>
        <h1 className={styles['title']}>Co zjeść?</h1>
        <ProductPickerContainer />
      </div>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
