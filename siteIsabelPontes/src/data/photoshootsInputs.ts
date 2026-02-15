import type { Person } from '@/types/person';
type PersonId = Person['id'];
export interface Photoshoot {
  id: string; // afrodite-andressa
  shootKey: string; // andressa
  title: string;
  description: string;
  concept: string;
  date: Date;
  location: string;
  image_urls?: string[];
  models: PersonId[];
  teamMembers?: PersonId[];
  partners?: PersonId[];
  featured: boolean;
}
export const photoshootInputs: Record<string, Photoshoot> = {
  Afrodite: {
    id: 'afrodite-andressa',
    shootKey: 'Andressa', // tem que bater com manifest.projects["Afrodite"]["Andressa"]
    title: 'Andressa',
    description: '...',
    concept: '...',
    date: new Date('2024-01-10'),
    location: 'Curitiba, PR',
    models: ['milena-silva'],
    teamMembers: ['ana-costa'],
    partners: [],
    featured: true,
  },
};
