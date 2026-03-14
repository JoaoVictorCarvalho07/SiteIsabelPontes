import { useState, useEffect } from 'react';
import { photoshootInputs } from '@/data/photoshootsInputs';
import type { Photoshoot } from '@/types/photoshoot';

const BASE = import.meta.env.VITE_R2_PUBLIC_BASE;

export function usePhotoshoots() {
  const [data, setData] = useState<Record<string, Photoshoot[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/manifest.json');
        if (!response.ok) throw new Error('Failed to fetch manifest');
        const manifest = await response.json();

        const resolvedData: Record<string, Photoshoot[]> = Object.fromEntries(
          photoshootInputs.flatMap((project) =>
            Object.entries(project).map(([id, shootkey]) => {
              const projectId = id.toLowerCase();

              // Find project in manifest (case-insensitive)
              const manifestProjectKey = Object.keys(
                manifest.projects || {},
              ).find((k) => k.toLowerCase() === projectId);
              const projectManifest = manifestProjectKey
                ? manifest.projects[manifestProjectKey]
                : null;

              const ensaios: Photoshoot[] = shootkey.map((element) => {
                // Find shoot in project manifest (case-insensitive)
                const manifestShootKey = Object.keys(
                  projectManifest || {},
                ).find(
                  (k) => k.toLowerCase() === element.shootKey.toLowerCase(),
                );
                const files = manifestShootKey
                  ? projectManifest[manifestShootKey]
                  : [];

                const image_urls = files.map((file: string) => {
                  const normalized = file.startsWith('/')
                    ? file.slice(1)
                    : file;
                  // Use the actual manifest keys for the URL to ensure R2 path is correct
                  return `${BASE}/${manifestProjectKey}/${manifestShootKey}/${normalized}`;
                });

                const enc = (s: string) => encodeURIComponent(s);

                const joinR2 = (...parts: (string | undefined | null)[]) =>
                  parts
                    .filter(Boolean)
                    .map((p) => enc(String(p).replace(/^\/+|\/+$/g, ''))) // tira / no começo/fim
                    .join('/');
                const capa = `${BASE}/${joinR2(manifestProjectKey, manifestShootKey, 'capa.webp')}`;
                return {
                  ...element,
                  image_urls,
                  capa,
                };
              });

              return [id, ensaios];
            }),
          ),
        );

        setData(resolvedData);
      } catch (err) {
        console.error('Error loading photoshoots:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
