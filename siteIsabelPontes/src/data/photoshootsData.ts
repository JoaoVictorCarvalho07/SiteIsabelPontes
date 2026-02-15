import manifest from '@/utils/manifest2';
import { photoshootInputs, type Photoshoot } from './photoshootsInputs';
const BASE = import.meta.env.VITE_R2_PUBLIC_BASE;

export const photoshootsById: Record<string, Photoshoot[]> = Object.fromEntries(
  photoshootInputs.flatMap((project) =>
    Object.entries(project).map(([id, shootkey]) => {
      const ensaios: Photoshoot[] = [];
      shootkey.forEach((element) => {
        const projectId = id.split('-')[0]; // pega "afrodite" de "afrodite-andressa"

        const image_urls = buildImageUrls(projectId, element.shootKey);
        ensaios.push({
          ...element,
          image_urls,
        });
      });

      return [id, ensaios];
    }),
  ),
);

function buildImageUrls(projectId: string, shootKey: string): string[] {
  const files = manifest.projects?.[projectId]?.[shootKey] ?? [];

  return files.map((file) => {
    const normalized = file.startsWith('/') ? file.slice(1) : file;
    return `${BASE}/${projectId}/${shootKey}/${normalized}`;
  });
}
