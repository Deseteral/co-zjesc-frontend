import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';

function mapStateToJson(state) {
  const { title, products, description } = state;

  return {
    title,
    products,
    description: description.toString('markdown'),
  };
}

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      products: [{ name: '' }],
      description: RichTextEditor.createEmptyValue(),
    };
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleChangeProductsName(value, index) {
    const products = this.state.products;
    products[index].name = value;
    this.setState({ products });
  }

  addNewProduct() {
    const { products } = this.state;
    products.push({ name: '' });
    this.setState({ products });
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
          {this.state.products.map((p, index) => (
            <div>
              <TextField
                name={`product-${index}`}
                value={this.state.products[index].name}
                onChange={value => this.handleChangeProductsName(value, index)}
              />
            </div>
          ))}
          <Button onClick={() => this.addNewProduct()}>
            Dodaj składnik
          </Button>
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
