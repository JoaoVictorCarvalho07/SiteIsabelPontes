// src/hooks/useGallery.ts
import { useState, useEffect } from 'react';

export interface GalleryPhoto {
  key: string;
  url: string;
  tema: string;
  ensaio: string;
  alt: string;
}

export function useGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/manifest.json')
      .then((r) => r.json() as Promise<GalleryPhoto[]>)
      .then(setPhotos)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const temas = [...new Set(photos.map((p) => p.tema))];

  return { photos, temas, loading, error };
}
