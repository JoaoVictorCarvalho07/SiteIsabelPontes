import React, { useState, useEffect, useMemo, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { useGallery } from '@/hooks/useGallery';
import type { GalleryPhoto } from '@/hooks/useGallery';
import { cn } from '@/lib/utils';

// ── breakpoints para react-masonry-css ──────────────────────────────────────
const BREAKPOINTS = { default: 4, 1100: 3, 750: 2, 480: 1 };

// function useCols(): number {
//   const [cols, setCols] = useState(4);
//   useEffect(() => {
//     const update = () => {
//       if (window.innerWidth <= 480) setCols(1);
//       else if (window.innerWidth <= 750) setCols(2);
//       else if (window.innerWidth <= 1100) setCols(3);
//       else setCols(4);
//     };
//     update();
//     window.addEventListener('resize', update);
//     return () => window.removeEventListener('resize', update);
//   }, []);
//   return cols;
// }

// ── componente ───────────────────────────────────────────────────────────────
export default function PhotoGallery(): React.ReactElement {
  const { photos, temas, loading, error } = useGallery();
  // const cols = useCols();

  const [activeCategory, setActiveCategory] = useState('Todos');
  // const [revealedCount, setRevealedCount] = useState(cols);
  // const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // const loadedInBatchRef = useRef(0);
  // const revealedRef = useRef(cols);

  const categories = ['Todos', ...temas];

  const filtered =
    activeCategory === 'Todos'
      ? photos
      : photos.filter((p) => p.tema === activeCategory);

  // const visibleItems = filtered.slice(0, revealedCount);

  const lightbox = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  // scroll
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // sempre aparece se estiver bem no topo
      if (y < 25) {
        setVisible(true);
        lastY.current = y;
        return;
      }

      // evita ficar tremendo com micro scroll
      if (Math.abs(delta) < 8) return;

      // desceu -> esconde | subiu -> mostra
      setVisible(delta < 0);

      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // reset ao trocar categoria / cols / fotos
  // 1. reseta refs quando deps mudam (sem setState — sem o warning)

  // 2. reseta loadedIds e revealedCount separado
  // useEffect(() => {
  //   setLoadedIds(new Set());
  //   loadedInBatchRef.current = 0;
  //   revealedRef.current = cols;
  //   setRevealedCount(cols);
  // }, [activeCategory, cols, photos.length]);
  // // carrega linha por linha
  // const handleLoad = (key: string) => {
  //   setLoadedIds((prev) => new Set(prev).add(key));
  //   loadedInBatchRef.current += 1;

  //   if (loadedInBatchRef.current >= cols) {
  //     // ✅ sempre cols, não o total
  //     const next = Math.min(revealedRef.current + cols, filtered.length);
  //     revealedRef.current = next;
  //     loadedInBatchRef.current = 0;
  //     setRevealedCount(next);
  //   }
  // };

  // lightbox
  const openLightbox = (photo: GalleryPhoto) =>
    setLightboxIndex(filtered.findIndex((p) => p.key === photo.key));
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

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

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const shuffled = useMemo(() => shuffle(filtered), [activeCategory, photos]);

  // ── estados globais ───────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-['Cormorant_Garamond'] text-lg italic tracking-widest text-[#9e8c78]">
          Carregando...
        </p>
      </div>
    );

  if (!loading && !error && photos.length === 0)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-['Cormorant_Garamond'] text-lg italic tracking-widest text-[#9e8c78]">
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
      <div className="min-h-screen bg-background text-foreground md:pt-30 pt-10 ">
        {/* ── Header ── */}
        <header className="flex flex-wrap items-end justify-between gap-6 px-15  max-[750px]:flex-col max-[750px]:items-start max-[750px]:px-6 max-[750px]:pt-10">
          <div className="flex flex-col gap-1"></div>

          <nav className="flex flex-wrap justify-center gap-1.5  rounded-full bg-[#e3dbd2] p-1 max-[750px]:w-full ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'cursor-pointer rounded-full border-none font-["Jost"] text-[12px] font-light uppercase tracking-[0.12em] transition-[background,color] duration-200',
                  'px-5 py-2',
                  'max-[750px]:px-3 max-[750px]:py-1.5 max-[750px]:text-[20px]',
                  'max-[480px]:px-2.5 max-[480px]:py-1 max-[480px]:text-[14px] text-secondary ',
                  activeCategory === cat ? 'bg-background text-[#e3dbd2]!' : '',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        {/* ── Divider ── */}
        <div className="mx-15 mt-10 h-px bg-linear-to-r from-[#c9bfb2] to-transparent max-[750px]:mx-6 max-[750px]:mt-8" />

        {/* ── Masonry Grid ── */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="flex gap-2.5 px-15 pb-20 pt-8 max-[750px]:px-6 max-[750px]:py-6"
          columnClassName="flex flex-col gap-2.5"
        >
          {shuffled.map((photo, i) => (
            <div
              key={photo.key}
              onClick={() => openLightbox(photo)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative cursor-pointer overflow-hidden rounded-[15px] opacity-0 animate-[fadeUp_0.5s_ease_forwards] hover:z-10 hover:shadow-[0_20px_60px_rgba(42,32,24,0.22)]"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                className="block w-full rounded-[15px] filter-[saturate(0.9)_brightness(0.97)] transition-[transform,filter] duration-500 group-hover:scale-[1.04] group-hover:filter-[saturate(1.05)_brightness(1.02)]"
              />
              <div className="absolute inset-0 flex items-end rounded-[15px] bg-linear-to-t from-[rgba(42,32,24,0.55)] to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-['Cormorant_Garamond'] text-sm italic tracking-[0.05em] text-[#f0ebe4]">
                  {photo.tema}
                </span>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      <div
        className={cn(
          'fixed bottom-8 right-4 p-3 transition-opacity duration-300  border-[#c9bfb2] rounded-full bg-foreground text-background shadow-md',
          { 'opacity-0 pointer-events-none': !visible },
        )}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          up
        </button>
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
            style={{
              animation: 'scaleIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.alt}
              className="block max-h-[82vh] max-w-[90vw] rounded-sm object-contain"
            />
            <p className="mt-4 text-center font-['Cormorant_Garamond'] text-[15px] italic tracking-[0.06em] text-[#c9bfb2]">
              tema: {lightbox.alt.split('/')[0]}
              <span className="mt-1.5 block font-['Jost'] text-[11px] not-italic tracking-[0.2em] text-[#9e8c78]">
                {lightboxIndex! + 1} / {filtered.length}
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
