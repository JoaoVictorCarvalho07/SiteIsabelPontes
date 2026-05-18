import React, { useState, useEffect, useMemo, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { useGallery } from '@/hooks/useGallery';
import type { GalleryPhoto } from '@/hooks/useGallery';
import { cn } from '@/lib/utils';

// ── breakpoints ──────────────────────────────────────────────────────────────
const BREAKPOINTS = { default: 4, 1100: 3, 750: 2, 480: 1 };

// ── hook: número de colunas atual ────────────────────────────────────────────
function useCols(): number {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 480) setCols(1);
      else if (window.innerWidth <= 750) setCols(2);
      else if (window.innerWidth <= 1100) setCols(3);
      else setCols(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

// ── helpers ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function reorderForMasonry<T>(items: T[], columns: number): T[] {
  const rows = Math.ceil(items.length / columns);
  const result: T[] = [];
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      const index = row * columns + col;
      if (index < items.length) result.push(items[index]);
    }
  }
  return result;
}

// ── skeleton shimmer ─────────────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-10 rounded-[15px]', className)}
      style={{
        background:
          'linear-gradient(90deg, #e3dbd2 25%, #ece6de 50%, #e3dbd2 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
      }}
    />
  );
}

// ── componente ───────────────────────────────────────────────────────────────
export default function PhotoGallery(): React.ReactElement {
  const { photos, temas, loading, error } = useGallery();
  const cols = useCols();

  // ── filtro / categoria ───────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', ...temas];

  const filtered =
    activeCategory === 'Todos'
      ? photos
      : photos.filter((p) => p.tema === activeCategory);

  // ── ordem de exibição (shuffle → reorder para masonry) ───────────────────
  const shuffled = useMemo(() => shuffle(filtered), [activeCategory, photos]);

  const reorderMemo = useMemo(
    () => reorderForMasonry(shuffled, cols),
    [shuffled, cols],
  );

  // ── batch loading ────────────────────────────────────────────────────────
  const [revealedCount, setRevealedCount] = useState(cols);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const batchRef = useRef<Set<string>>(new Set());
  const revealedRef = useRef(cols);

  useEffect(() => {
    batchRef.current = new Set();
    revealedRef.current = cols;
    setLoadedIds(new Set());
    setRevealedCount(cols);
  }, [activeCategory, cols, photos.length]);

  const handleLoad = (key: string) => {
    batchRef.current.add(key);
    setLoadedIds((prev) => new Set(prev).add(key));

    const currentBatch = reorderMemo
      .slice(0, revealedRef.current)
      .map((p) => p.key);

    const batchDone = currentBatch.every((k) => batchRef.current.has(k));

    if (batchDone && revealedRef.current < reorderMemo.length) {
      const next = Math.min(revealedRef.current + cols, reorderMemo.length);
      revealedRef.current = next;
      setRevealedCount(next);
    }
  };

  const visibleItems = reorderMemo.slice(0, revealedCount);

  // ── lightbox ─────────────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightbox = lightboxIndex !== null ? shuffled[lightboxIndex] : null;

  const openLightbox = (photo: GalleryPhoto) =>
    setLightboxIndex(shuffled.findIndex((p) => p.key === photo.key));
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + shuffled.length) % shuffled.length : null,
    );
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % shuffled.length : null));

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

  // ── botão scroll-to-top ──────────────────────────────────────────────────
  const [scrollBtnVisible, setScrollBtnVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 25) {
        setScrollBtnVisible(true);
        lastY.current = y;
        return;
      }
      if (Math.abs(delta) < 8) return;
      setScrollBtnVisible(delta < 0);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowMsg(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // ── estados globais ───────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="type-caption text-lg text-muted-foreground">
          Carregando...
        </p>
      </div>
    );

  if (!loading && !error && photos.length === 0)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="type-caption text-lg text-muted-foreground">
          Nenhuma foto encontrada.
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen bg-background text-foreground md:pt-30 pt-10">
        {/* ── Header ── */}
        <header className="flex flex-wrap items-end justify-between gap-6 px-15 max-[750px]:flex-col max-[750px]:items-start max-[750px]:px-6 max-[750px]:pt-10">
          {/* Marca */}
          <div className="flex flex-col gap-1">
            <span className="type-label text-muted-foreground">Portfólio</span>
            <h1 className="type-h1">Isabel Pontes</h1>
          </div>

          {/* Filtros de categoria */}
          <nav
            className="flex flex-wrap justify-center gap-1 rounded-full bg-muted p-1 max-[750px]:w-full"
            aria-label="Filtrar por categoria"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'cursor-pointer rounded-full border-none type-label px-5 py-2 transition-[background,color] duration-200',
                  'max-[750px]:px-3 max-[750px]:py-1.5',
                  'max-[480px]:px-2.5 max-[480px]:py-1',
                  activeCategory === cat
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
                )}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        {/* ── Divider ── */}
        <div className="mx-15 mt-10 h-px bg-linear-to-r from-border to-transparent max-[750px]:mx-6 max-[750px]:mt-8" />

        {/* ── Masonry Grid ── */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="flex gap-2.5 px-15 pb-20 pt-8 max-[750px]:px-6 max-[750px]:py-6"
          columnClassName="flex flex-col gap-2.5"
        >
          {visibleItems.map((photo, i) => (
            <div
              key={photo.key}
              onClick={() => openLightbox(photo)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative cursor-pointer overflow-hidden rounded-[15px] opacity-0 animate-[fadeUp_0.5s_ease_forwards] hover:z-10 hover:shadow-xl"
            >
              {/* Skeleton shimmer enquanto carrega */}
              {!loadedIds.has(photo.key) && <Shimmer />}

              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                onLoad={() => handleLoad(photo.key)}
                className={cn(
                  'block w-full rounded-[15px]',
                  'transition-[transform,filter,opacity] duration-500',
                  'group-hover:scale-[1.04] group-hover:brightness-[1.02] group-hover:saturate-[1.05]',
                  loadedIds.has(photo.key) ? 'opacity-100' : 'opacity-0',
                )}
              />

              {/* Overlay com tema ao hover */}
              <div className="absolute inset-0 flex items-end rounded-[15px] bg-linear-to-t from-[rgba(42,32,24,0.55)] to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="type-caption text-[#f0ebe4]">
                  {photo.tema}
                </span>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* ── Scroll to top ── */}
      <div
        className={cn(
          'fixed bottom-8 right-4 p-3 transition-opacity duration-300 rounded-full bg-foreground text-background shadow-md',
          { 'opacity-0 pointer-events-none': !scrollBtnVisible },
        )}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Inicio
        </button>
      </div>

      <div
        className={cn(
          'fixed bottom-8 left-4 p-3 transition-opacity duration-300 rounded-full bg-foreground text-background shadow-md',
          { 'opacity-0 pointer-events-none': !scrollBtnVisible || showMsg },
        )}
      >
        <p>Clique na imagem para ampliar</p>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(30,22,14,0.92)] backdrop-blur-md"
          style={{ animation: 'fadeIn 0.3s ease' }}
          onClick={closeLightbox}
        >
          {/* fechar */}
          <button
            onClick={closeLightbox}
            className="fixed right-8 top-6 z-50 cursor-pointer border-none bg-transparent text-[28px] leading-none text-[#c9bfb2] transition-[color,transform] duration-200 hover:rotate-90 hover:text-[#f0ebe4]"
          >
            ✕
          </button>

          {/* anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="fixed left-6 top-1/2 z-50 flex h-13 w-13 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(240,235,228,0.15)] bg-[rgba(240,235,228,0.08)] text-[48px] leading-none text-[#f0ebe4] transition-[background,transform] duration-200 hover:bg-[rgba(240,235,228,0.18)]"
          >
            <span className="-translate-y-1.5">‹</span>
          </button>

          {/* imagem */}
          <div
            className="relative max-h-[88vh] max-w-[90vw]"
            style={{ animation: 'scaleIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.alt}
              className="block max-h-[82vh] max-w-[90vw] rounded-sm object-contain"
            />
            <p className="mt-4 text-center type-caption text-[#c9bfb2]">
              tema: {lightbox.alt.split('/')[0]}
              <span className="mt-1.5 block font-ui text-[11px] not-italic tracking-wider text-[#9e8c78]">
                {lightboxIndex! + 1} / {shuffled.length}
              </span>
            </p>
          </div>

          {/* próximo */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="fixed right-6 top-1/2 z-50 flex h-13 w-13 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(240,235,228,0.15)] bg-[rgba(240,235,228,0.08)] text-[48px] leading-none text-[#f0ebe4] transition-[background,transform] duration-200 hover:bg-[rgba(240,235,228,0.18)]"
          >
            <span className="-translate-y-1.5">›</span>
          </button>
        </div>
      )}
    </>
  );
}
