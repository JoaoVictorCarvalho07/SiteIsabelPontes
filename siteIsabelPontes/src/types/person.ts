export type PersonCategory =
  | 'models'
  | 'agências'
  | 'stylists'
  | 'brands'
  | 'makeup';

export interface Person {
  id: string; // ex: "milena-silva"
  name: string;
  image: string;
  description?: string;
  instagram?: string;
  website?: string;
  testimonial?: string;
  role?: string; // ex: "model", "makeup", "assistant"
  category?: PersonCategory;
  websiteUrl?: string;
}
