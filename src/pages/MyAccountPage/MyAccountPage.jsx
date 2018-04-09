import React, { Component, Fragment } from 'react';
import RecipeListing from '../../components/RecipeListing/RecipeListing';
import CardHeader from '../../components/CardHeader/CardHeader';
import CoZjescService from '../../services/co-zjesc-service';

class MyAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
    };
  }

  componentDidMount() {
    CoZjescService
      .recipes
      .getFromCurrentUser()
      .then(recipes => this.setState({ recipes }));
  }

  render() {
    const { recipes } = this.state;

    return (
      <Fragment>
        <CardHeader>
          Moje konto
        </CardHeader>
        {recipes && (
          <RecipeListing
            title="Moje przepisy"
            recipes={recipes}
            withEditButtons
          />
        )}
      </Fragment>
    );
  }
}

export default MyAccountPage;
