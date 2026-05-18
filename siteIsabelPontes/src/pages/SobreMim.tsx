import { Link } from 'react-router-dom';
import { ImageWithWrappedText } from '@/components/ImageWithWrappedText';
import { CarouselSpacing } from '@/components/CarouselSpacing';
import { Button } from '@/components/ui/button';

const CAROUSEL_ITEMS = [
  { src: './sobre/SobreMim1.jpeg', alt: 'Director 1' },
  { src: './sobre/SobreMim2.jpeg', alt: 'Director 2' },
  { src: './sobre/SobreMim3.jpeg', alt: 'Director 3' },
  { src: './sobre/SobreMim4.jpeg', alt: 'Director 4' },
  { src: './sobre/SobreMim5.jpeg', alt: 'Director 5' },
  { src: './sobre/SobreMim6.png', alt: 'Director 6' },
  { src: './sobre/SobreMim7.png', alt: 'Director 7' },
  { src: './sobre/SobreMim8.jpeg', alt: 'Director 8' },
];

const VALUES = [
  {
    title: 'Autenticidade',
    description:
      'Imagens que revelam o que é real — sem máscaras, com intenção. Prefiro o imperfeito verdadeiro ao perfeito fabricado.',
  },
  {
    title: 'Narrativa visual',
    description:
      'Cada ensaio é uma história. Luz, composição e presença contam o que palavras não alcançam.',
  },
  {
    title: 'Colaboração',
    description:
      'O melhor trabalho nasce do encontro. Venho com referências, mas ouço o que você traz.',
  },
];

export default function SobreMim() {
  return (
    <div className="lg:max-w-6xl lg:mx-auto bg-background text-foreground">

      {/* Bloco 1 — texto com drop cap */}
      <div className="px-10 pt-25">
        <ImageWithWrappedText imgUrl="./sobre/SobreMim4.jpeg" dropCap>
          Meu nome é Isabel Pontes, sou fotógrafa artística e criadora visual
          atuando em Curitiba. Minha relação com a arte começou muito antes da
          fotografia entrar oficialmente na minha vida. Desde criança sempre fui
          movida por imaginação, movimento e criação. Participei de companhia de
          dança e sempre tive uma curiosidade natural sobre expressão artística.
          Gostava de montar cenários, inventar histórias e transformar ideias em
          pequenas encenações — muitas vezes sem perceber que esse impulso
          criativo acabaria se tornando parte fundamental da minha profissão no
          futuro.
        </ImageWithWrappedText>
      </div>

      {/* Pull quote */}
      <blockquote className="mx-10 my-12 lg:mx-auto lg:max-w-[80%] border-l-2 border-accent pl-8 py-2">
        <p className="type-h3 italic text-muted-foreground leading-relaxed">
          "Gosto de observar como a imaginação humana se manifesta através das
          imagens, das histórias e das simbologias que atravessam diferentes
          culturas."
        </p>
      </blockquote>

      {/* Bloco 2 — imagem à direita */}
      <div className="px-10">
        <ImageWithWrappedText
          imgUrl="./sobre/SobreMim6.png"
          ImageClassName="float-right ml-4 text-primary"
        >
          Desde cedo também desenvolvi o hábito de buscar inspiração em livros,
          filmes, pinturas e diferentes formas de arte. Essa curiosidade constante
          sobre o imaginário e sobre as formas de expressão artística acabou
          moldando profundamente o meu olhar criativo.
          <span className="hidden md:inline">
            {' '}Nasci em Manaus, cercada por natureza, e esse ambiente sempre teve
            uma influência muito forte na forma como eu enxergo o mundo. A
            presença da floresta, dos rios e da vida natural despertou em mim
            uma sensibilidade especial para observar detalhes, atmosferas e
            símbolos presentes na natureza. Ao mesmo tempo, sempre me senti
            atraída por temas que exploram o imaginário, o simbólico e o
            espiritual.
          </span>
        </ImageWithWrappedText>
      </div>

      {/* Carrossel */}
      <div className="lg:max-w-[80%] lg:mx-auto mt-12">
        <CarouselSpacing className="max-w-full" items={CAROUSEL_ITEMS} />
      </div>

      {/* Parágrafo final pessoal */}
      <div className="lg:max-w-[80%] lg:mx-auto">
        <p className="type-body text-primary px-10 pt-8 pb-0">
          Fora das telas me considero uma pessoa bastante reservada, mas que
          valoriza muito as conexões profundas e significativas. Gosto de ocupar
          meu tempo com atividades que me mantenham ativa tanto na mente quanto
          no corpo. Sou apaixonada por dança mas atualmente tenho me dedicado ao
          Crossfit — o que me ajuda a manter o equilíbrio físico e mental. Gosto
          de assistir animes no meu tempo livre e, junto com meu parceiro, estou
          entrando aos poucos no mundo dos games, o que tem sido uma experiência
          divertida e desafiadora.
        </p>
      </div>

      {/* Seção valores */}
      <section className="mx-10 mt-20 mb-8 lg:mx-auto lg:max-w-[80%]">
        <p className="type-label text-muted-foreground mb-4">O que guia o meu trabalho</p>
        <h2 className="type-h2 mb-12">Valores</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUES.map((v) => (
            <div key={v.title} className="flex flex-col gap-3">
              <div className="w-8 h-px bg-accent" />
              <h3 className="type-h3">{v.title}</h3>
              <p className="type-body text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-10 mt-16 mb-24 lg:mx-auto lg:max-w-[80%] flex flex-col items-center gap-4 text-center border-t border-border pt-16">
        <p className="type-label text-muted-foreground">Pronto para criarmos algo juntos?</p>
        <h2 className="type-h2">Vamos conversar</h2>
        <p className="type-body text-muted-foreground max-w-md">
          Me conta o que você tem em mente — ensaio, evento, projeto criativo.
          Respondo em até 24h úteis.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link to="/contato">Entre em contato →</Link>
        </Button>
      </section>

    </div>
  );
}
