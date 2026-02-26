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
              const ensaios: Photoshoot[] = shootkey.map((element) => {
                const projectId = id.split('-')[0];
                const files = manifest.projects?.[projectId]?.[element.shootKey] ?? [];

                const image_urls = files.map((file: string) => {
                  const normalized = file.startsWith('/') ? file.slice(1) : file;
                  return `${BASE}/${projectId}/${element.shootKey}/${normalized}`;
                });

                return {
                  ...element,
                  image_urls,
                };
              });

              return [id, ensaios];
            }),
          ),
        );

        setData(resolvedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
