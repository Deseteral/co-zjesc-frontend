import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import CoZjescService from '../../services/co-zjesc-service';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import styles from './RecipeEditPage.css';

const DIFFICULTY_LEVELS = [
  { id: 1, name: 'bardzo łatwy' },
  { id: 2, name: 'łatwy' },
  { id: 3, name: 'średni' },
  { id: 4, name: 'trudny' },
  { id: 5, name: 'bardzo trudny' },
];

function mapStateToJson(state) {
  const {
    title,
    description,
    difficulty,
    estimatedCost,
    portionCount,
    timeToPrepare,
    tags,
  } = state;

  const products = state.products
    .filter(p => (p.name.length > 0 && !!p.amount && !!p.unit))
    .map(p => ({
      name: p.name,
      amount: parseFloat(p.amount),
      unit: parseInt(p.unit, 10),
    }));

  return {
    title: title.trim(),
    images: [],
    products,
    description: description.toString('markdown'),
    difficulty: parseInt(difficulty, 10),
    estimatedCost: parseInt(estimatedCost, 10),
    portionCount: parseInt(portionCount, 10),
    timeToPrepare: parseInt(timeToPrepare, 10),
    tags: tags.split(',').map(s => s.trim()).filter(s => s.length),
  };
}

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      products: [{ name: '', amount: '' }],
      description: RichTextEditor.createEmptyValue(),
      difficulty: '',
      estimatedCost: '',
      portionCount: '',
      timeToPrepare: '',
      tags: '',
      units: [],
    };
  }

  componentDidMount() {
    CoZjescService.units.get().then(units => this.setState({ units }));
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

  submit() {
    const recipe = mapStateToJson(this.state);
    console.log(recipe);
    CoZjescService.recipes.add(recipe)
      .then(() => console.log('Added recipe'))
      .catch(e => console.log(e));
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
            <li>
              <TextField
                name="tags"
                value={this.state.tags}
                placeholder="Lista tagów"
                onChange={value => this.handleChange(value, 'tags')}
              />
            </li>
          </ul>
        </section>
        <section>
          <Button
            onClick={() => this.submit()}
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
