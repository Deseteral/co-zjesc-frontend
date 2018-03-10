import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: RichTextEditor.createEmptyValue(),
    };
  }

  render() {
    return (
      <Card>
        <CardHeader>Dodaj nowy przepis</CardHeader>
        <TextField
          name="title"
          value={this.state.title}
          placeholder="Tytuł przepisu"
          onChange={value => this.handleChange(value, 'title')}
        />
        <RichTextEditor
          value={this.state.description}
          onChange={value => this.setState({ description: value })}
        />
      </Card>
    );
  }
}

export default RecipeEditPage;
