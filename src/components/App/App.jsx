import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RecipeSuggesterPage from '../RecipeSuggesterPage/RecipeSuggesterPage';
import RecipeViewPage from '../RecipeViewPage/RecipeViewPage';
import styles from './App.css';

const DEFAULT_ROUTE = '/suggester';

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
                  path="/recipe/:id"
                  component={(({ match }) => <RecipeViewPage recipeId={match.params.id} />)}
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
