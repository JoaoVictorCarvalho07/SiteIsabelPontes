import type { Category, Photo } from '@/types/photoGallery';

export const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    alt: 'Castle in the mist',
    category: 'Epoca',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
    alt: 'Woman in white dress lying in nature',
    category: 'Retratos',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&q=80',
    alt: 'Couple in the snow',
    category: 'Casais',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    alt: 'Woman reading by curtains',
    category: 'Retratos',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    alt: 'Woman surrounded by leaves',
    category: 'Retratos',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    alt: 'Couple in the field',
    category: 'Casais',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    alt: 'Green landscape',
    category: 'Epoca',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1490750967868-88df5691766a?w=600&q=80',
    alt: 'Red flowers in field',
    category: 'Personalizado',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    alt: 'Golden hour grass',
    category: 'Personalizado',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600&q=80',
    alt: 'Couple in warm light',
    category: 'Casais',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=600&q=80',
    alt: 'Misty forest path',
    category: 'Tematico',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    alt: 'Portrait in golden light',
    category: 'Retratos',
  },
];

export const categories: Category[] = [
  'Todos',
  'Retratos',
  'Casais',
  'Epoca',
  'Personalizado',
  'Tematico',
  'Especial',
];
