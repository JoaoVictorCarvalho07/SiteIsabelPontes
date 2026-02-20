import type { Person } from '@/types/person';
import { slugify } from '@/utils/slugify';

const rawPartners: Omit<Person, 'id'>[] = [
  {
    name: 'Milena Silva',
    category: 'models',
    image: '/cards/Milena.jpg',
    description:
      'Modelo profissional com experiência em editorials conceituais',
    instagram: '@milenasilvaa',
    testimonial: 'Trabalhar com Isabel é uma experiência transformadora...',
  },
  // outros...
];

export const partners: Person[] = rawPartners.map((p, index) => ({
  ...p,
  id: `${slugify(p.name)}-${index + 1}`,
}));
