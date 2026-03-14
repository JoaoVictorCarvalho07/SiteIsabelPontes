import React, { useState, useEffect } from 'react';

type Category = 'Todos' | 'Retratos' | 'Casais' | 'Lugares' | 'Natureza';

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, 'Todos'>;
}

const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    alt: 'Castle in the mist',
    category: 'Lugares',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
    alt: 'Woman in white dress lying in nature',
    category: 'Retratos',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&q=80',
    alt: 'Couple in the snow',
    category: 'Casais',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    alt: 'Woman reading by curtains',
    category: 'Retratos',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    alt: 'Woman surrounded by leaves',
    category: 'Retratos',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    alt: 'Couple in the field',
    category: 'Casais',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    alt: 'Green landscape',
    category: 'Lugares',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1490750967868-88df5691766a?w=600&q=80',
    alt: 'Red flowers in field',
    category: 'Natureza',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    alt: 'Golden hour grass',
    category: 'Natureza',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600&q=80',
    alt: 'Couple in warm light',
    category: 'Casais',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=600&q=80',
    alt: 'Misty forest path',
    category: 'Lugares',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    alt: 'Portrait in golden light',
    category: 'Retratos',
  },
];

const categories: Category[] = [
  'Todos',
  'Retratos',
  'Casais',
  'Lugares',
  'Natureza',
];

export default function PhotoGallery(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const filtered: Photo[] =
    activeCategory === 'Todos'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  // Reset visibleIds when category changes
  useEffect(() => {
    const ids = filtered.map((p) => p.id);
    const timers = ids.map((id, i) =>
      setTimeout(() => {
        setVisibleIds((prev: number[]) =>
          prev.includes(id)
            ? prev
            : [...prev.filter((v) => ids.includes(v)), id],
        );
      }, i * 80),
    );
    return () => {
      timers.forEach(clearTimeout);
      setVisibleIds([]);
    };
  }, [activeCategory]);
  const handleLoad = (id: number): void =>
    setLoadedIds((prev) => new Set(prev).add(id));

  const openLightbox = (photo: Photo): void => setLightbox(photo);
  const closeLightbox = (): void => setLightbox(null);

  const handleBackdropClick = (): void => closeLightbox();
  const handleImgWrapClick = (e: React.MouseEvent): void => e.stopPropagation();

  return (
    <>
      <div className="gallery-root">
        {/* ── Header ── */}
        <header className="gallery-header">
          <div className="gallery-brand">
            <span className="gallery-brand-eyebrow">
              Fotografia & Arte Visual
            </span>
            <h1 className="gallery-brand-title">
              Lumière <em>Atelier</em>
            </h1>
          </div>

          <nav className="gallery-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-nav-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        <div className="gallery-divider" />

        {/* ── Masonry Grid ── */}
        <div className="gallery-grid">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className={`gallery-item${visibleIds.includes(photo.id) ? ' visible' : ''}`}
              onClick={() => openLightbox(photo)}
            >
              {!loadedIds.has(photo.id) && (
                <div className="gallery-item-skeleton" />
              )}

              <img
                src={photo.src}
                alt={photo.alt}
                className={loadedIds.has(photo.id) ? 'img-loaded' : ''}
                onLoad={() => handleLoad(photo.id)}
                loading="lazy"
              />

              <div className="gallery-item-overlay">
                <span className="gallery-item-label">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="gallery-footer">
          © 2026 Lumière Atelier · Todos os direitos reservados
        </p>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={handleBackdropClick}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>

          <div className="lightbox-img-wrap" onClick={handleImgWrapClick}>
            <img
              src={lightbox.src.replace('w=600', 'w=1200')}
              alt={lightbox.alt}
            />
            <p className="lightbox-caption">
              {lightbox.alt} · {lightbox.category}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
