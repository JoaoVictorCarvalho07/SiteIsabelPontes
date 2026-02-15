import type { PortfolioProject } from '@/types/portfolio';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'afrodite',
    title: 'Afrodite',
    description:
      'Projeto editorial inspirado na mitologia grega, explorando a beleza e a força feminina através de imagens poderosas e conceituais.',
    category: 'conceitual',
    image: '/portfolio/afrodite/cover.jpg',
    photoshoots: [
      'afrodite-andressa',
      'afrodite-isabel',
      'afrodite-mika',
      'afrodite-milena',
      'afrodite-paty_anie',
      'afrodite-tally',
    ],
  },
  {
    id: 'epoca',
    title: 'Época',
    description:
      'Projeto editorial para a revista Época, destacando tendências de moda e estilo de vida, com uma abordagem contemporânea e sofisticada.',
    category: 'editorial',
    image: '/portfolio/epoca/cover.jpg',
    photoshoots: [
      'epoca-andressa',
      'epoca-Anna_Julia',
      'epoca-GLAUCIA_OLLIE',
      'epoca-Bruna_Camargo',
      'epoca-Hayanna',
      'epoca-Heidi',
      'epoca-jessica',
      'epoca-Paloma',
    ],
  },
  {
    id: 'eventos',
    title: 'Eventos',
    description:
      'Cobertura fotográfica de eventos, capturando momentos únicos e a atmosfera vibrante das pessoas e do festival.',
    category: 'direção-criativa',
    image: '/portfolio/eventos/cover.jpg',
    photoshoots: [
      'eventos-jheni_e_a_cobra',
      'eventos-isabel',
      'eventos-mika',
      'eventos-milena',
      'eventos-paty_anie',
      'eventos-tally',
    ],
  },
  {
    id: 'musa_day',
    title: 'Musa Day',
    description:
      'Projeto feminino voltado para reunir mulheres inspiradoras e criativas, celebrando a diversidade e a força feminina através de fotos e histórias envolventes.',
    category: 'direção-criativa',
    image: '/portfolio/musa_day/cover.jpg',
    photoshoots: [
      'musa_day-Andressa_e_a_cobra',
      'musa_day-Daiara',
      'musa_day-Monica_e_a_coruja',
      'musa_day-nadia_e_a_cobra',
    ],
  },
  {
    id: 'ensaios_externos',
    title: 'Ensaios Externos',
    description:
      'Série de ensaios fotográficos realizados em locações externas, explorando diferentes ambientes e estilos de iluminação.',
    category: 'editorial',
    image: '/portfolio/ensaios_externos/cover.jpg',
    photoshoots: ['ensaios_externos-MUSAS MÍSTICAS ENSAIO EXTERNO'],
  },
  {
    id: 'personalizados',
    title: 'Personalizados',
    description:
      'Projetos personalizados para clientes, adaptando o estilo e a abordagem fotográfica às necessidades e preferências individuais.',
    category: 'independentes',
    image: '/portfolio/personalizados/cover.jpg',
    photoshoots: [
      'personalizados-jaci',
      'personalizados-keshy',
      'personalizados-Nadia_Lobkov1',
      'personalizados-Nadia_Lobkov2',
      'personalizados-Lara',
      'personalizados-Monica',
    ],
  },
];
