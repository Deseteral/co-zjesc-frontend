/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Header from '../Header/Header';
import RecipeSuggesterPage from '../../pages/RecipeSuggesterPage/RecipeSuggesterPage';
import RecipeViewPage from '../../pages/RecipeViewPage/RecipeViewPage';
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
  const theme = createMuiTheme({
    palette: {
      secondary: {
        light: '#ffc947',
        main: '#ff9800',
        dark: '#c66900',
        contrastText: '#000000',
      },
      primary: {
        light: '#ff867f',
        main: '#ff5252',
        dark: '#c50e29',
        contrastText: '#ffffff',
      },
    },
  });

  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <div>
          <MuiThemeProvider theme={theme}>
            <Route
              path="/"
              exact
              component={(() => <Redirect to={DEFAULT_ROUTE} />)}
            />
            <div className={styles['app-container']}>
              <Header />
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
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
