/**
 * @module container/SuggesterRecipeListing
 */

import { connect } from 'react-redux';
import RecipeListing from '../components/RecipeListing/RecipeListing';

function mapStateToProps(state) {
  return {
    title: 'Dobrane przepisy',
    recipes: state.suggesterRecipes,
  };
}

function mapDispatchToProps() {
  return {};
}

const SuggesterRecipeListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeListing);

/**
 * RecipeListing component connected to the application store
 * Renders recipes that were suggested by the service
 */
export default SuggesterRecipeListing;
