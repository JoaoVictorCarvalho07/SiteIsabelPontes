import type { Partner, PartnerInput } from '@/types/partner';
import { slugify } from '../utils/slugify';

const rawPartners: PartnerInput[] = [
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

export const partners: Partner[] = rawPartners.map((p, index) => ({
  ...p,
  id: `${slugify(p.name)}-${index + 1}`,
}));
