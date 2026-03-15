import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Link } from 'react-router';
import { useGallery } from '@/hooks/useGallery';
import { useMemo } from 'react';

type EditorialCard = {
  title: string;
  description: string;
  image: string;
  href: string;
};

// type LinkDescription = {
//   title: string;
//   description: string;
//   href: string;
//   label: string;
// };

// const linkDescriptions: LinkDescription[] = [
//   {
//     title: 'Sobre Mim',
//     description: 'Conheça minha trajetória e inspirações.',
//     href: '/sobre',
//     label: 'Minha Trajetoria →',
//   },
//   {
//     title: 'Portfólio Completo',
//     description: 'Explore todos os meus projetos e ensaios fotográficos.',
//     href: '/galeria',
//     label: 'Ver Portfólio →',
//   },
//   {
//     title: 'Blog',
//     description: 'Leia meus artigos sobre fotografia e direção criativa.',
//     href: '/blog',
//     label: 'Visitar Blog →',
//   },
//   {
//     title: 'Contato',
//     description: 'Vamos trabalhar juntos? Entre em contato comigo.',
//     href: '/contato',
//     label: 'Fale Comigo →',
//   },
//   {
//     title: 'Parceiros',
//     description: 'Conheça minha equipe e colaboradores.',
//     href: '/parceiros',
//     label: 'Ver Parceiros →',
//   },
// ];

export default function HomeEditorial() {
  const { photos, temas, loading, error } = useGallery();
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
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
    // {
    //   title: 'Direção criativa',
    //   description: 'Storytelling, direção de arte e identidade visual.',
    //   image: '/cards/Director.jpg',
    //   href: '/direcao-criativa',
    // },
  ];

  return (
    <main className="bg-background text-foreground ">
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
            <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Bem-vindo(a) ao meu universo
            </h1>
            <p className="mt-4 max-w-md text-white/90">
              Direção criativa, fotografia artística e storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS EDITORIAIS */}
      <section className="mx-auto max-w-full px-6 py-24 ">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) =>
            card.href.startsWith('http') ? (
              <a
                key={card.title}
                href={card.href}
                target="_parent"
                className="group block"
              >
                <Card className="relative h-[520px] overflow-hidden rounded-3xl border-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />

                  <div className="relative z-10 flex h-full items-end p-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/90">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            ) : (
              <Link to={card.href}>
                <Card className="relative h-[520px] overflow-hidden rounded-3xl border-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />

                  <div className="relative z-10 flex h-full items-end p-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/90">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* SOBRE MIM */}
      <section className="mx-auto max-w-6xl px-6 pb-32 md:px-24">
        {/* {linkDescriptions.map((link) => (
          <Item key={link.title} className="border  border-neutral-600 mt-10">
            <ItemContent className="grow-3 items-center">
              <ItemTitle className="">{link.title}</ItemTitle>
              <ItemDescription>{link.description}</ItemDescription>
            </ItemContent>
            <ItemActions className="max-w-[30%] ">
              <Button
                className="w-auto max-w-full whitespace-break-spaces max-h-full h-auto bg-accent text-accent-foreground"
                variant={'outline'}
              >
                <Link to={link.href}>{link.label}</Link>
              </Button>
            </ItemActions>
          </Item>
        ))} */}

        {/* <Item className="border  border-neutral-600">
          <ItemContent className="grow-3 items-center">
            <ItemTitle className="">Sobre Mim</ItemTitle>

            <ItemDescription>
              Diretora criativa e fotógrafa artística. Tarabalho com imagem como
              linguagem, narrativa e experiência.
            </ItemDescription>
          </ItemContent>
          <ItemActions className="max-w-[30%] ">
            <Button
              className="w-auto max-w-full whitespace-break-spaces max-h-full h-auto bg-accent text-accent-foreground"
              variant={'outline'}
            >
              <Link to="/sobre">Minha trajetória →</Link>
            </Button>
          </ItemActions>
        </Item>

        <Item className="border  border-neutral-600 mt-10">
          <ItemContent className="grow-3 items-center">
            <ItemTitle className="">Contato</ItemTitle>
            <ItemDescription>
              Quer trabalhar comigo ou tem alguma dúvida? Entre em contato!
            </ItemDescription>
          </ItemContent>
          <ItemActions className="max-w-[30%]">
            <Button
              className="w-auto max-w-full whitespace-break-spaces max-h-full h-auto  bg-accent text-accent-foreground"
              variant={'default'}
            >
              <Link to="/contato">Fale comigo →</Link>
            </Button>
          </ItemActions>
        </Item>
        <Item className="border  border-border mt-10">
          <ItemContent className="grow-3 items-center">
            <ItemTitle className="">Contato</ItemTitle>
            <ItemDescription>
              Quer trabalhar comigo ou tem alguma dúvida? Entre em contato!
            </ItemDescription>
          </ItemContent>
          <ItemActions className="max-w-[30%]">
            <Button
              className="w-auto max-w-full whitespace-break-spaces max-h-full h-auto"
              variant={'default'}
            >
              <Link to="/contato">Fale comigo →</Link>
            </Button>
          </ItemActions>
        </Item>
        <Item className="border  border-border mt-10">
          <ItemContent className="grow-3 items-center">
            <ItemTitle className="">Contato</ItemTitle>
            <ItemDescription>
              Quer trabalhar comigo ou tem alguma dúvida? Entre em contato!
            </ItemDescription>
          </ItemContent>
          <ItemActions className="max-w-[30%]">
            <Button
              className="w-auto max-w-full whitespace-break-spaces max-h-full h-auto"
              variant={'default'}
            >
              <Link to="/contato">Fale comigo →</Link>
            </Button>
          </ItemActions>
        </Item> */}
      </section>
    </main>
  );
}
