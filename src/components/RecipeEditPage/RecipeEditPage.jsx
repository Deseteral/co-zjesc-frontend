import React, { Component } from 'react';
import commonStyles from '../../common.css';

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <div className={commonStyles['card']}>
        RecipeEditPage
      </div>
    );
  }
}

export default RecipeEditPage;
