export type Category =
  | 'Todos'
  | 'Retratos'
  | 'Casais'
  | 'Epoca'
  | 'Personalizado'
  | 'Tematico'
  | 'Especial';

export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, 'Todos'>;
}
