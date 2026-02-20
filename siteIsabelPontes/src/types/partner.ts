export type PartnerCategory = 'models' | 'agências' | 'stylists' | 'brands' | 'makeup';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  image: string;
  description: string;
  instagram?: string;
  website?: string;
  testimonial?: string;
}
