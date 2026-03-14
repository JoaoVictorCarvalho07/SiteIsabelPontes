import type { Person } from '@/types/person';

export type Model = Person & {
  portfolio?: string;
};
