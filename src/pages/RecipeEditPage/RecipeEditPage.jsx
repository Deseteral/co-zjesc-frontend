import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import styles from './RecipeEditPage.css';

function mapStateToJson(state) {
  const { title, description } = state;

  const products = state.products
    .filter(p => (p.name.length > 0 && !!p.unit))
    .map(p => ({ name: p.name, unit: parseInt(p.unit, 10) }));

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
      units: [{ id: 1, name: 'kg' }, { id: 2, name: 'g' }, { id: 3, name: 'ml' }],
    };
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleChangeProducts(value, part, index) {
    const products = this.state.products;
    products[index][part] = value;
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
            <div className={styles['product-list-element']}>
              <TextField
                name={`product-${index}-name`}
                value={this.state.products[index].name}
                placeholder="Nazwa składnika"
                onChange={value => this.handleChangeProducts(value, 'name', index)}
              />
              <Select
                name={`product-${index}-unit`}
                options={this.state.units}
                onChange={value => this.handleChangeProducts(value, 'unit', index)}
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
