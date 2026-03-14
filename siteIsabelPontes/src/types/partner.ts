import type { Person, PersonCategory } from '@/types/person';

export type PartnerCategory = PersonCategory;

export type Partner = Person & {
  testimonial?: string;
};

export type PartnerInput = Omit<Partner, 'id'>;
