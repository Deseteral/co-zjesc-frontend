import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

function redirectToSearchPage(query) {
  const encodedQuery = encodeURI(query);
  const redirectUrl = `/search/${encodedQuery}`;
  window.location.replace(redirectUrl);
}

function MainPage() {
  return (
    <SearchBar
      onEnterPress={query => redirectToSearchPage(query)}
    />
  );
}

export default MainPage;
