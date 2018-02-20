import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RecipeSuggesterPage from '../RecipeSuggesterPage/RecipeSuggesterPage';
import RecipeViewPage from '../RecipeViewPage/RecipeViewPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import RecipeEditPage from '../../pages/RecipeEditPage/RecipeEditPage';
import styles from './App.css';

const DEFAULT_ROUTE = '/suggester';

function extractIdFromUrl(props, callback) {
  const id = parseInt(props.match.params.id, 10);
  return callback(id);
}

function App(props) {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <div>
          <Route
            path="/"
            exact
            component={(() => <Redirect to={DEFAULT_ROUTE} />)}
          />
          <div className={styles['app-container']}>
            <h1 className={styles['title']}>Co zjeść?</h1>
            <div className={styles['container']}>
              <Switch>
                <Route
                  path="/suggester"
                  component={RecipeSuggesterPage}
                />
                <Route
                  path="/recipe/add"
                  component={RecipeEditPage}
                />
                <Route
                  path="/recipe/:id"
                  component={p => extractIdFromUrl(p, id => <RecipeViewPage recipeId={id} />)}
                />
                <Route
                  path="/login"
                  component={LoginPage}
                />
                <Route
                  path="/register"
                  component={RegisterPage}
                />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
