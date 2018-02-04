import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import ImageGallery from 'react-image-gallery';
import { DiscussionEmbed } from 'disqus-react';
import styles from './RecipeView.css';
import commonStyles from '../../common.css';
import './recipe-gallery.public.css';

function RecipeView({ id, title, images, products, description, tiles, tags }) {
  const disqusConfig = {
    url: `http://cozjesc.netlify.com/recipe/${id}`,
    identifier: `recipe-${id}`,
    title,
  };

  return (
    <div className={css(commonStyles['card'], styles['card'])}>
      <h1>{title}</h1>
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
        <h2>Składniki</h2>
        <ul>
          {products.map(p => <li key={p.id}>{p.label}</li>)}
        </ul>
      </section>
      <section>
        <h2>Opis przygotowania</h2>
        <div>{description}</div>
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
      <section>
        <DiscussionEmbed config={disqusConfig} shortname="cozjesc" />
      </section>
    </div>
  );
}

RecipeView.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.string,
  })).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  description: PropTypes.string.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default RecipeView;
