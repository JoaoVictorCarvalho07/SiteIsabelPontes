import type { Person } from '@/types/person';
export type PersonId = Person['id'];
export interface Photoshoot {
  id: string; // afrodite-andressa
  shootKey: string; // andressa
  title: string;
  description: string;
  concept: string;
  date: Date;
  location: string;
  image_urls: string[];
  models: PersonId[];
  teamMembers?: PersonId[];
  partners?: PersonId[];
  featured: boolean;
  capa?: string; // URL da imagem de capa
}
  