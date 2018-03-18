/* eslint-disable no-console */
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import CoZjescService from '../../services/co-zjesc-service';
import Card from '../../components/Card/Card';
import TextField from '../../components/TextField/TextField';
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
      images: [],
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

  onFileDrop(files) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    CoZjescService.images
      .post(formData)
      .then((uploadedImages) => {
        const { images } = this.state;
        images.concat(uploadedImages);

        console.log(images);
        this.setState({ images });
      });
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
        <div className={styles['card-header']}>
          Dodaj nowy przepis
        </div>
        <section>
          <TextField
            label="Tytuł przepisu"
            value={this.state.title}
            onChange={value => this.handleChange(value, 'title')}
            fullWidth
          />
        </section>
        <section>
          <div className={styles['section--header']}>
            Zdjęcia
          </div>
          <Dropzone
            onDrop={files => this.onFileDrop(files)}
            accept="image/*"
          />
        </section>
        <section>
          <div className={styles['section--header']}>
            Składniki
          </div>
          <div className={styles['product-list']}>
            {this.state.products.map((p, index) => (
              <div className={styles['product-list-element']}>
                <TextField
                  label="Nazwa składnika"
                  value={this.state.products[index].name}
                  onChange={value => this.handleChangeProducts(value, 'name', index)}
                />
                <div className={styles['product-list-element--amount']}>
                  <TextField
                    label="Ilość"
                    value={this.state.products[index].amount}
                    onChange={value => this.handleChangeProducts(value, 'amount', index)}
                    fullWidth
                  />
                </div>
                <Select
                  id={`product-${index}-unit`}
                  label="Jednostka"
                  options={this.state.units}
                  onChange={value => this.handleChangeProducts(value, 'unit', index)}
                />
              </div>
            ))}
          </div>
          <Button color="primary" onClick={() => this.addNewProduct()}>
            Dodaj składnik
          </Button>
        </section>
        <section>
          <div className={styles['section--header']}>
            Opis
          </div>
          <RichTextEditor
            value={this.state.description}
            onChange={value => this.setState({ description: value })}
          />
        </section>
        <section>
          <div className={styles['section--header']}>
            Atrybuty
          </div>
          <div className={styles['attribute-list']}>
            <Select
              id="difficulty"
              label="Poziom trudności"
              options={DIFFICULTY_LEVELS}
              onChange={value => this.handleChange(value, 'difficulty')}
            />
            <TextField
              label="Przybliżony koszt"
              value={this.state.estimatedCost}
              onChange={value => this.handleChange(value, 'estimatedCost')}
              endAdornment="zł"
              fullWidth
            />
            <TextField
              label="Liczba porcji"
              value={this.state.portionCount}
              onChange={value => this.handleChange(value, 'portionCount')}
              fullWidth
            />
            <TextField
              label="Czas przygotowania"
              value={this.state.timeToPrepare}
              onChange={value => this.handleChange(value, 'timeToPrepare')}
              endAdornment="minut"
              fullWidth
            />
            <TextField
              label="Lista tagów"
              value={this.state.tags}
              onChange={value => this.handleChange(value, 'tags')}
              fullWidth
            />
          </div>
        </section>
        <section className={styles['buttons']}>
          <Button
            onClick={() => this.submit()}
            color="primary"
            variant="raised"
          >
            Dodaj przepis
          </Button>
        </section>
      </Card>
    );
  }
}

export default RecipeEditPage;
