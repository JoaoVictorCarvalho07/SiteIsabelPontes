import React, { useState, useEffect } from 'react';
import { useGallery } from '@/hooks/useGallery';
import type { GalleryPhoto } from '@/hooks/useGallery';
type Category =
  | 'Todos'
  | 'Retratos'
  | 'Casais'
  | 'Epoca'
  | 'Personalizado'
  | 'Tematico'
  | 'Especial'
  | '';

const categories: Category[] = [
  'Todos',
  'Retratos',
  'Casais',
  'Epoca',
  'Personalizado',
  'Tematico',
  'Especial',
];

export default function PhotoGallery(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  const { photos, temas, loading, error } = useGallery();

  const categories = ['Todos', ...temas];

  const filtered =
    activeCategory === 'Todos'
      ? photos
      : photos.filter((p) => p.tema === activeCategory);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightbox = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const openLightbox = (photo: GalleryPhoto): void =>
    setLightboxIndex(filtered.findIndex((p) => p.key === photo.key));

  const closeLightbox = (): void => setLightboxIndex(null);

  const prevPhoto = (): void =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );

  const nextPhoto = (): void =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  useEffect(() => {
    const keys = filtered.map((p) => p.key);
    const timers = keys.map((key, i) =>
      setTimeout(() => {
        setVisibleIds((prev) =>
          prev.includes(key)
            ? prev
            : [...prev.filter((v) => keys.includes(v)), key],
        );
      }, i * 80),
    );
    return () => {
      timers.forEach(clearTimeout);
      setVisibleIds([]);
    };
  }, [activeCategory]);

  const handleLoad = (id: string): void =>
    setLoadedIds((prev) => new Set(prev).add(id));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  const handleBackdropClick = (): void => closeLightbox();
  const handleImgWrapClick = (e: React.MouseEvent<HTMLDivElement>): void =>
    e.stopPropagation();

  if (loading) return <div className="gallery-loading">Carregando...</div>;
  if (error) return <div className="gallery-error">{error}</div>;
  return (
    <>
      <div className="gallery-root bg-background text-foreground">
        {/* ── Header ── */}
        <header className="gallery-header">
          <div className="gallery-brand"></div>

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
              key={photo.key}
              className={`gallery-item${visibleIds.includes(photo.key) ? ' visible' : ''}`}
              onClick={() => openLightbox(photo)}
            >
              {!loadedIds.has(photo.key) && (
                <div className="gallery-item-skeleton" />
              )}

              <img
                src={photo.url}
                alt={photo.alt}
                className={loadedIds.has(photo.key) ? 'img-loaded' : ''}
                onLoad={() => handleLoad(photo.key)}
                loading="lazy"
              />

              <div className="gallery-item-overlay">
                <span className="gallery-item-label">{photo.tema}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>

          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
          >
            ‹
          </button>

          <div
            className="lightbox-img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.url} alt={lightbox.alt} />
            <p className="lightbox-caption">
              {lightbox.alt} · {lightbox.ensaio}
              <span className="lightbox-counter">
                {lightboxIndex! + 1} / {filtered.length}
              </span>
            </p>
          </div>

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
