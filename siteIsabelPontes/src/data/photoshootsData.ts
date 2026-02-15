import manifest from '@/utils/manifest2';
import photoshoots from './shoots_raw';
import type { Person } from '@/types/person';
import { photoshootInputs, type Photoshoot } from './photoshootsInputs';
const BASE = import.meta.env.VITE_R2_PUBLIC_BASE;

type PersonId = Person['id'];

export const photoshootsById: Record<string, Photoshoot> = Object.fromEntries(
  Object.entries(photoshootInputs).map(([id, shoot]) => {
    const projectId = id.split('-')[0]; // pega "afrodite" de "afrodite-andressa"

    const image_urls = buildImageUrls(projectId, shoot.shootKey);

    return [
      id,
      {
        ...shoot,
        date: new Date(shoot.date),
        image_urls,
      },
    ];
  }),
);

function buildImageUrls(projectId: string, shootKey: string): string[] {
  const files = manifest.projects?.[projectId]?.[shootKey] ?? [];

  return files.map((file) => {
    const normalized = file.startsWith('/') ? file.slice(1) : file;
    return `${BASE}/ensaios/${projectId}/${shootKey}/${normalized}`;
  });
}
