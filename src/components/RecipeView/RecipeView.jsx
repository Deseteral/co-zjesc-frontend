import React from 'react';
import ImageGallery from 'react-image-gallery';
import { DiscussionEmbed } from 'disqus-react';
import Card from '../Card/Card';
import CardHeader from '../CardHeader/CardHeader';
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
      <CardHeader>{title}</CardHeader>
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
    </Card>
  );
}

export default RecipeView;
