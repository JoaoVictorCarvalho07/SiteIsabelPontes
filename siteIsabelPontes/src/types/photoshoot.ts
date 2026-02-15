import type { Person } from '@/types/person';
export type PersonId = Person['id'];

export interface Photoshoot {
  id: string; // ex: "afrodite-andressa"
  projectKey: string; // ex: "Afrodite" (pasta no R2/manifest)
  shootKey: string; // ex: "Andressa" (pasta no R2/manifest)
  title: string;
  description: string;
  concept: string;
  date: Date;
  location: string;

  // vem do manifest + R2 (não hardcode)
  image_urls: string[];

  // referências (performático)
  models: PersonId[];
  teamMembers?: PersonId[];
  partners?: PersonId[];

  featured: boolean;
}
