import type { Person } from '@/types/person';

export const partners: Person[] = [
  {
    id: 'milena-silva',
    name: 'Milena Silva',
    image: '/cards/Milena.jpg',
    description:
      'Modelo profissional com experiência em editorials conceituais',
    instagram: '@milenasilvaa',
    testimonial: 'Trabalhar com Isabel é uma experiência transformadora...',
    role: 'model',
    category: 'models',
  },
  {
    id: 'andressa',
    name: 'Andressa',
    image: '/cards/Andressa.jpg',
    description: 'Modelo e produtora criativa',
    instagram: undefined,
    role: 'model',
    category: 'models',
  },
  {
    id: 'isabel-pontes',
    name: 'Isabel Pontes',
    image: '/cards/Director.jpg',
    description: 'Diretora criativa e fotógrafa',
    instagram: '@isapontesfoto',
    role: 'photographer',
    category: 'models',
  },
];

export const personsById: Record<string, Person> = Object.fromEntries(
  partners.map((p) => [p.id, p]),
);
