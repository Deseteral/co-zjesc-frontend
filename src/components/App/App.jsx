/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Header from '../Header/Header';
import MainPage from '../../pages/MainPage/MainPage';
import RecipeSuggesterPage from '../../pages/RecipeSuggesterPage/RecipeSuggesterPage';
import RecipeViewPage from '../../pages/RecipeViewPage/RecipeViewPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import NewRecipePage from '../../pages/NewRecipePage/NewRecipePage';
import EditRecipePage from '../../pages/EditRecipePage/EditRecipePage';
import CategoryListingPage from '../../pages/CategoryListingPage/CategoryListingPage';
import SearchPage from '../../pages/SearchPage/SearchPage';
import MyAccountPage from '../../pages/MyAccountPage/MyAccountPage';
import styles from './App.css';

function extractIdFromUrl(props, callback) {
  const id = parseInt(props.match.params.id, 10);
  return callback(id);
}

function extractQueryFromUrl(props, callback) {
  const encodedQuery = props.match.params.query;
  const query = decodeURI(encodedQuery);
  return callback(query);
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
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#ffffff',
      },
    },
  });

  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <div>
          <MuiThemeProvider theme={theme}>
            <Header />
            <div className={styles['app-container']}>
              <div className={styles['container']}>
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={MainPage}
                  />
                  <Route
                    path="/suggester"
                    component={RecipeSuggesterPage}
                  />
                  <Route
                    path="/recipe/add"
                    component={NewRecipePage}
                  />
                  <Route
                    path="/recipe/:id/edit"
                    component={p => extractIdFromUrl(p, id => <EditRecipePage id={id} />)}
                  />
                  <Route
                    path="/recipe/:id"
                    component={p => extractIdFromUrl(p, id => <RecipeViewPage recipeId={id} />)}
                  />
                  <Route
                    path="/category/:id"
                    component={p => extractIdFromUrl(p, id => (
                      <CategoryListingPage categoryId={id} />
                    ))}
                  />
                  <Route
                    path="/login"
                    component={LoginPage}
                  />
                  <Route
                    path="/register"
                    component={RegisterPage}
                  />
                  <Route
                    path="/search/:query"
                    component={p => extractQueryFromUrl(p, query => (
                      <SearchPage query={query} />
                    ))}
                  />
                  <Route
                    path="/search"
                    component={SearchPage}
                  />
                  <Route
                    path="/my-account"
                    component={MyAccountPage}
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
