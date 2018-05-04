/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import shortid from 'shortid';
import css from 'classnames';
import CoZjescService from '../../services/co-zjesc-service';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader/CardHeader';
import TextField from '../../components/TextField/TextField';
import Select from '../../components/Select/Select';
import styles from './RecipeEditor.css';

const DIFFICULTY_LEVELS = [
  { id: 1, name: 'bardzo łatwy' },
  { id: 2, name: 'łatwy' },
  { id: 3, name: 'średni' },
  { id: 4, name: 'trudny' },
  { id: 5, name: 'bardzo trudny' },
];

const EDITOR_TOOLBAR_CONFIG = {
  display: ['HISTORY_BUTTONS', 'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

function mapStateToJson(state) {
  const {
    id,
    title,
    category,
    images,
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
      id: p.id,
      name: p.name,
      amount: parseFloat(p.amount),
      unit: parseInt(p.unit, 10),
    }));

  return {
    id,
    title: title.trim(),
    category,
    images: images.map(p => p.relativeUrl),
    products,
    description: description.toString('markdown'),
    difficulty: parseInt(difficulty, 10),
    estimatedCost: parseInt(estimatedCost, 10),
    portionCount: parseInt(portionCount, 10),
    timeToPrepare: parseInt(timeToPrepare, 10),
    tags: tags.split(',').map(s => s.trim()).filter(s => s.length),
  };
}

function getEmptyProduct() {
  return {
    id: shortid.generate(),
    name: '',
    amount: '',
    unit: '',
  };
}

function stateFromProps(props) {
  return {
    id: props.id,
    title: props.title,
    category: props.category.id.toString(),
    images: props.images,
    products: props.products.map(p => ({
      id: p.id,
      name: p.name,
      amount: p.amount.toString(),
      unit: p.unit.id.toString(),
    })),
    description: RichTextEditor.createValueFromString(props.description, 'markdown'),
    difficulty: props.difficulty.toString(),
    estimatedCost: props.estimatedCost.toString(),
    portionCount: props.portionCount.toString(),
    timeToPrepare: props.timeToPrepare.toString(),
    tags: props.tags.map(t => t.name).join(','),
    units: [],
    categories: [],
  };
}

class RecipeEditor extends Component {
  constructor(props) {
    super(props);

    const EMPTY_STATE = {
      id: null,
      title: '',
      category: '',
      images: [],
      products: [getEmptyProduct()],
      description: RichTextEditor.createEmptyValue(),
      difficulty: '',
      estimatedCost: '',
      portionCount: '',
      timeToPrepare: '',
      tags: '',
      units: [],
      categories: [],
    };

    this.state = props.id
      ? stateFromProps(props)
      : EMPTY_STATE;
  }

  componentDidMount() {
    CoZjescService.units.get().then(units => this.setState({ units }));
    CoZjescService.categories.get().then(categories => this.setState({ categories }));
  }

  onFileDrop(files) {
    const formData = new FormData();
    files.forEach((file, index) => formData.append(`file-${index}`, file));

    CoZjescService.images
      .post(formData)
      .then((uploadedImages) => {
        const images = this.state.images.concat(uploadedImages);
        this.setState({ images });
      });
  }

  handleChange(value, part) {
    this.setState({ [part]: value });
  }

  handleChangeProducts(value, part, index) {
    const { products } = this.state;
    products[index][part] = value;
    this.setState({ products });
  }

  addNewProduct() {
    const { products } = this.state;
    products.push(getEmptyProduct());
    this.setState({ products });
  }

  removeProduct(index) {
    const { products } = this.state;
    products.splice(index, 1);
    this.setState({ products });
  }

  submit() {
    const recipe = mapStateToJson(this.state);
    const method = this.props.id ? 'update' : 'add';
    console.log(recipe);

    CoZjescService.recipes[method](recipe)
      .then(id => window.location.assign(`/recipe/${id}`))
      .catch(e => console.log(e));
  }

  render() {
    const submitButtonText = this.props.id
      ? 'Edytuj przepis'
      : 'Dodaj przepis';
    const cardTitle = this.props.id
      ? 'Edytuj przepis'
      : 'Dodaj nowy przepis';
    const dropzonePlaceholderContainerClassName = css(
      styles['dropzone-placeholder-container'],
      this.state.images.length === 0 ? styles['dropzone-placeholder-container--center'] : null,
    );

    return (
      <Card>
        <CardHeader>
          {cardTitle}
        </CardHeader>
        <section>
          <TextField
            label="Tytuł przepisu"
            value={this.state.title}
            onChange={value => this.handleChange(value, 'title')}
            fullWidth
          />
          <Select
            id="category-select"
            label="Kategoria"
            value={this.state.category}
            options={this.state.categories}
            onChange={value => this.handleChange(value, 'category')}
          />
        </section>
        <section>
          <div className={styles['section--header']}>
            Zdjęcia
          </div>
          <Dropzone
            className={styles['dropzone']}
            onDrop={files => this.onFileDrop(files)}
            accept="image/*"
          >
            <div className={dropzonePlaceholderContainerClassName}>
              {(this.state.images.length > 0) && (
                <div className={styles['dropzone-stripe']}>
                  {this.state.images.map(i => (
                    <div
                      key={i.relativeUrl}
                      style={({ backgroundImage: `url(${i.absoluteUrl})` })}
                      className={styles['dropzone-image']}
                    />
                  ))}
                </div>
              )}
              {(this.state.images.length === 0) && (
                <div className={styles['dropzone-placeholder']}>
                  <Icon>cloud_upload</Icon>
                  <span className={styles['dropzone-placeholder-text']}>
                    Kliknij lub upuść zdjęcia
                  </span>
                </div>
              )}
            </div>
          </Dropzone>
        </section>
        <section>
          <div className={styles['section--header']}>
            Składniki
          </div>
          <div className={styles['product-list']}>
            {this.state.products.map((p, index) => (
              <div className={styles['product-list-element']} key={p.id}>
                <TextField
                  label="Nazwa składnika"
                  value={this.state.products[index].name}
                  onChange={value => this.handleChangeProducts(value, 'name', index)}
                />
                <div className={styles['product-list-group']}>
                  <div className={styles['product-list-element--amount']}>
                    <TextField
                      label="Ilość"
                      value={this.state.products[index].amount}
                      onChange={value => this.handleChangeProducts(value, 'amount', index)}
                      fullWidth
                    />
                  </div>
                  <Select
                    id={`product-${p.id}-unit`}
                    label="Jednostka"
                    value={p.unit}
                    options={this.state.units}
                    onChange={value => this.handleChangeProducts(value, 'unit', index)}
                  />
                  <IconButton onClick={() => this.removeProduct(index)}>
                    <Icon>close</Icon>
                  </IconButton>
                </div>
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
            className={styles['editor-root']}
            editorClassName={styles['editor-area']}
            toolbarClassName={styles['editor-toolbar']}
            value={this.state.description}
            onChange={value => this.setState({ description: value })}
            toolbarConfig={EDITOR_TOOLBAR_CONFIG}
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
              value={this.state.difficulty}
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
              label="Lista tagów (po przecinku)"
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
            {submitButtonText}
          </Button>
        </section>
      </Card>
    );
  }
}

RecipeEditor.propTypes = {
  id: PropTypes.number,
};

RecipeEditor.defaultProps = {
  id: null,
};

export default RecipeEditor;
