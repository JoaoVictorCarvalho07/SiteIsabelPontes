import type { Person } from '@/types/person';
import { slugify } from '@/utils/slugify';

const rawPartners: Omit<Person, 'id'>[] = [

  // outros...
];

export const partners: Person[] = rawPartners.map((p, index) => ({
  ...p,
  id: `${slugify(p.name)}-${index + 1}`,
}));
