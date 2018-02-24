import React, { Component } from 'react';
import Card from '../../components/Card/Card';

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <Card>
        RecipeEditPage
      </Card>
    );
  }
}

export default RecipeEditPage;
