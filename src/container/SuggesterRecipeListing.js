import { connect } from 'react-redux';
import RecipeListing from '../components/RecipeListing/RecipeListing';

function mapStateToProps(state) {
  return {
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

export default SuggesterRecipeListing;
