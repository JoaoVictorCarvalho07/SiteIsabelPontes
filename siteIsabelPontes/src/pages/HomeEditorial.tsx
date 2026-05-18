import { useGallery } from '@/hooks/useGallery';
import { useMemo } from 'react';
import EditorialCard from '@/components/EditorialCard';

type EditorialCard = {
  title: string;
  description: string;
  image: string;
  href: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomeEditorial() {
  const { photos } = useGallery();
  const shuffled = useMemo(() => shuffle(photos), [photos]);

  const cards: EditorialCard[] = [
    {
      title: 'Fotografia artística',
      description: 'Ensaios conceituais e direção de pessoas.',
      image:
        shuffled.length > 0
          ? shuffled[0].url
          : '/cards/FotografiaArtistica.jpg',
      href: '/galeria',
    },
    {
      title: 'Mídia kit & creator',
      description: 'Conteúdo autêntico com estética elevada.',
      image: '/cards/MidiaKit.jpg',
      href: 'https://xn--isabelpontesportflio-r8b.com.br/',
    },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative h-[80vh] min-h-140 overflow-hidden">
        <img
          src="/hero/hero.jpg"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[40%_30%]"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-20 text-white">
            <h1 className="type-h1 max-w-xl">
              Bem-vindo(a) ao meu universo
            </h1>
            <p className="mt-4 max-w-md text-white/90 type-body">
              Direção criativa, fotografia artística e storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS EDITORIAIS */}
      <section className="mx-auto max-w-full px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <EditorialCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
