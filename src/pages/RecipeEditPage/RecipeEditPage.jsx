import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';

function mapStateToJson(state) {
  const { title } = state;

  return {
    title,
    description: state.description.toString('markdown'),
  };
}

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: RichTextEditor.createEmptyValue(),
    };
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  render() {
    return (
      <Card>
        <CardHeader>Dodaj nowy przepis</CardHeader>
        <section>
          <TextField
            name="title"
            value={this.state.title}
            placeholder="Tytuł przepisu"
            onChange={value => this.handleChange(value, 'title')}
          />
        </section>
        <section>
          <CardHeader secondary>Zdjęcia</CardHeader>
        </section>
        <section>
          <CardHeader secondary>Składniki</CardHeader>
        </section>
        <section>
          <CardHeader secondary>Opis</CardHeader>
          <RichTextEditor
            value={this.state.description}
            onChange={value => this.setState({ description: value })}
          />
        </section>
        <section>
          <Button
            onClick={() => console.log(mapStateToJson(this.state))}
            primary
          >
            Dodaj przepis
          </Button>
        </section>
      </Card>
    );
  }
}

export default RecipeEditPage;
