import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import styles from './RecipeEditPage.css';

const DIFFICULTY_LEVELS = [
  { value: 1, name: 'bardzo łatwy' },
  { value: 2, name: 'łatwy' },
  { value: 3, name: 'średni' },
  { value: 4, name: 'trudny' },
  { value: 5, name: 'bardzo trudny' },
];

function mapStateToJson(state) {
  const {
    title,
    description,
    difficulty,
    estimatedCost,
    portionCount,
    timeToPrepare,
  } = state;

  const products = state.products
    .filter(p => (p.name.length > 0 && !!p.unit))
    .map(p => ({ name: p.name, amount: parseFloat(p.amount), unit: parseInt(p.unit, 10) }));

  return {
    title,
    images: [],
    products,
    description: description.toString('markdown'),
    difficulty,
    estimatedCost,
    portionCount,
    timeToPrepare,
  };
}

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      products: [{ name: '', amount: '' }],
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
    products.push({ name: '', amount: '' });
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
              <TextField
                name={`product-${index}-amount`}
                value={this.state.products[index].amount}
                placeholder="Ilość"
                onChange={value => this.handleChangeProducts(value, 'amount', index)}
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
          <CardHeader secondary>Atrybuty</CardHeader>
          <ul>
            <li>
              <span>Poziom trudności</span>
              <Select
                name="difficulty"
                options={DIFFICULTY_LEVELS}
                onChange={value => this.handleChange(value, 'difficulty')}
              />
            </li>
            <li>
              <TextField
                name="estimatedCost"
                value={this.state.estimatedCost}
                placeholder="Przybliżony koszt"
                onChange={value => this.handleChange(value, 'estimatedCost')}
              />
              zł
            </li>
            <li>
              <TextField
                name="portionCount"
                value={this.state.portionCount}
                placeholder="Liczba porcji"
                onChange={value => this.handleChange(value, 'portionCount')}
              />
            </li>
            <li>
              <TextField
                name="timeToPrepare"
                value={this.state.timeToPrepare}
                placeholder="Czas przygotowania"
                onChange={value => this.handleChange(value, 'timeToPrepare')}
              />
              minut
            </li>
          </ul>
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
