/**
 * @module components/RecipeView
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import RichTextEditor from 'react-rte';
import { DiscussionEmbed } from 'disqus-react';
import ReactStars from 'react-stars';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Card from '../Card/Card';
import CardHeader from '../CardHeader/CardHeader';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './RecipeView.css';
import './recipe-gallery.public.css';
import CoZjescService from '../../services/co-zjesc-service';

/**
 * Recipe view component.
 */
class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.isFavorite,
      canRate: props.canVote,
      rating: props.rating,
    };
  }

  /**
   * Handles adding recipe to favorites.
   */
  onFavoritesPress() {
    const { id } = this.props;
    const { isFavorite } = this.state;
    const method = isFavorite ? 'remove' : 'add';

    if (isFavorite === null) return;

    CoZjescService
      .recipes
      .favorites[method](id)
      .then(result => result && this.setState({ isFavorite: !isFavorite }));
  }

  /**
   * Handles voting on recipe rating.
   * @param {number} rating - new rating for the recipe
   */
  onRecipeRate(rating) {
    const { id } = this.props;

    CoZjescService
      .recipes
      .rate(id, rating)
      .then(newRate => this.setState({ canRate: false, rating: newRate }))
      .catch(() => this.setState({ canRate: false }));
  }

  render() {
    const {
      id,
      title,
      images,
      products,
      description,
      tiles,
      tags,
    } = this.props;

    const {
      canRate,
      rating,
      isFavorite,
    } = this.state;

    const normalizedRating = rating.toFixed(2);

    const disqusConfig = {
      url: `http://cozjesc.netlify.com/recipe/${id}`,
      identifier: `recipe-${id}`,
      title,
    };

    const editorDescription = RichTextEditor.createValueFromString(description, 'markdown');

    return (
      <Fragment>
        <Card>
          <CardHeader>
            {title}
          </CardHeader>
          <section className={styles['section--stars']}>
            <div className={styles['stars-container']}>
              <ReactStars
                count={5}
                value={rating}
                onChange={r => this.onRecipeRate(r)}
                size={24}
                edit={canRate}
                half={false}
                color1="var(--disabled-text-color)"
                color2="var(--accent-color)"
              />
              <div>Ocena: {normalizedRating}</div>
            </div>
            <div className={styles['favorites-container']}>
              <IconButton
                onClick={() => window.print()}
                color="primary"
              >
                <Icon>print</Icon>
              </IconButton>
              {isFavorite !== null && (
                <FavoriteButton
                  active={isFavorite}
                  onClick={() => this.onFavoritesPress()}
                />
              )}
            </div>
          </section>
          <section>
            <ImageGallery
              items={images}
              showNav
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </section>
          <section>
            <div className={styles['section--header']}>
              Składniki
            </div>
            <ul>
              {products.map(p => <li key={p.id}>{p.label}</li>)}
            </ul>
          </section>
          <section>
            <div className={styles['section--header']}>
              Opis przygotowania
            </div>
            <RichTextEditor
              className={styles['description']}
              value={editorDescription}
              toolbarConfig={({})}
              disabled
            />
          </section>
          <section className={styles['section--tiles']}>
            {tiles.map(tile => (
              <div className={styles['tile']} key={tile.id}>
                <div className={styles['tile--value']}>{tile.value}</div>
                <div className={styles['tile--title']}>{tile.title}</div>
              </div>
            ))}
          </section>
          <section className={styles['section--tags']}>
            {tags.map(t => <div key={t.id} className={styles['soap']}>{t.name}</div>)}
          </section>
          <section className={styles['section--comments']}>
            <DiscussionEmbed config={disqusConfig} shortname="cozjesc" />
          </section>
        </Card>
        <p className={styles['license-info']}>
          Przepisy ze zmianami i zdjęcia z <a href="https://pl.wikibooks.org/wiki/Książka_kucharska">https://pl.wikibooks.org/wiki/Książka_kucharska</a> na licencji <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode.pl">Creative Commons</a>.
        </p>
      </Fragment>
    );
  }
}

RecipeView.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  rating: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool, // eslint-disable-line react/require-default-props
  canVote: PropTypes.bool,
};

RecipeView.defaultProps = {
  canVote: false,
};

export default RecipeView;
