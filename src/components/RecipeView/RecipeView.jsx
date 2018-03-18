import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { DiscussionEmbed } from 'disqus-react';
import Card from '../Card/Card';
import styles from './RecipeView.css';
import './recipe-gallery.public.css';

function RecipeView({ id, title, images, products, description, tiles, tags }) {
  const disqusConfig = {
    url: `http://cozjesc.netlify.com/recipe/${id}`,
    identifier: `recipe-${id}`,
    title,
  };

  return (
    <Card>
      <div className={styles['card-header']}>
        {title}
      </div>
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
    </Card>
  );
}

RecipeView.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeView;
