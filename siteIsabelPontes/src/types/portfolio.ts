export type ProjectCategory =
  | 'all'
  | 'editorial'
  | 'direção-criativa'
  | 'mídia-kit'
  | 'conceitual'
  | 'personalizados';

export interface PortfolioProject {
  id: string; // ex: "afrodite"
  title: string;
  description: string;
  category: ProjectCategory;
  image: string; // capa do projeto
  photoshoots: string[]; // ids dos photoshoots
}
