import type { Photoshoot } from '@/types/photoshoot';
import type { TeamMember } from '@/types/teamMember';

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

export type { Photoshoot, TeamMember };
