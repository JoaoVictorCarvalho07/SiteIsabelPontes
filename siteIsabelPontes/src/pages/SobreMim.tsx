import { ImageWithWrappedText } from '@/components/ImageWithWrappedText';
import { CarouselSpacing } from '@/components/CarouselSpacing';

export default function SobreMim() {
  const itens = [
    { src: './sobre/SobreMim1.jpeg', alt: 'Director 1' },
    { src: './sobre/SobreMim2.jpeg', alt: 'Director 1' },
    { src: './sobre/SobreMim3.jpeg', alt: 'Director 1' },
    { src: './sobre/SobreMim4.jpeg', alt: 'Director 1' },
    { src: './sobre/SobreMim5.jpeg', alt: 'Director 1' },
    { src: './sobre/SobreMim6.png', alt: 'Director 1' },
    { src: './sobre/SobreMim7.png', alt: 'Director 1' },
    { src: './sobre/SobreMim8.jpeg', alt: 'Director 1' },
  ];
  return (
    <div className="lg:max-w-6xl lg:mx-auto font bg-background text-foreground">
      <div className="px-10 pt-25 ">
        <ImageWithWrappedText imgUrl="./sobre/SobreMim4.jpeg">
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
      <div className="px-10 pt-10">
        <ImageWithWrappedText
          imgUrl="./sobre/SobreMim6.png"
          ImageClassName="float-right ml-4 text-primary"
        >
          Desde cedo também desenvolvi o hábito de buscar inspiração em livros,
          filmes, pinturas e diferentes formas de arte. Gosto de observar como a
          imaginação humana se manifesta através das imagens, das histórias e
          das simbologias que atravessam diferentes culturas. Essa curiosidade
          constante sobre o imaginário e sobre as formas de expressão artística
          acabou moldando profundamente o meu olhar criativo.
          <div className="hidden md:block">
            Nasci em Manaus, cercada por natureza, e esse ambiente sempre teve
            uma influência muito forte na forma como eu enxergo o mundo. A
            presença da floresta, dos rios e da vida natural despertou em mim
            uma sensibilidade especial para observar detalhes, atmosferas e
            símbolos presentes na natureza. Ao mesmo tempo, sempre me senti
            atraída por temas que exploram o imaginário, o simbólico e o
            espiritual. O universo das mitologias, do místico e das narrativas
            arquetípicas sempre despertou minha curiosidade.
          </div>
        </ImageWithWrappedText>
      </div>
      <div className="lg:max-w-[80%] lg:mx-auto">
        <CarouselSpacing className="max-w-full  " items={itens} />

        <p className="text-primary p-10 pt-0 pb-0">
          Fora das telas me considero uma pessoa bastante reservada, mas que
          valoriza muito as conexões profundas e significativas. Gosto de ocupar
          meu tempo com atividades que me mantenham ativa tanto na mente quanto
          no corpo. Sou apaixonada por dança mas atualmente tenho me dedicado ao
          Crossfit o que me ajuda a manter o equilibrio fisico e mental. Gosto
          de assistir animes no meu tempo livre e atualmente junto com meu
          parceiro estou entrando aos poucos no mundo dos games, o que tem sido
          uma experiência divertida e desafiadora. Acredito que essas atividades
          complementam minha prática artística, pois me permitem explorar
          diferentes formas de expressão e conexão com o mundo ao meu redor.
        </p>
      </div>
    </div>
  );
}
