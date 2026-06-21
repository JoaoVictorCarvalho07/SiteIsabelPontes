import { useEffect } from 'react';
import './PrecosEvento.css';

const BranchDivider = () => (
  <div className="divider">
    <svg viewBox="0 0 140 22" fill="none">
      <path d="M0 11 H55" stroke="#B6913A" strokeWidth="1" />
      <path d="M85 11 H140" stroke="#B6913A" strokeWidth="1" />
      <path
        d="M70 11c-3-7-10-9-16-5 4 1 7 4 8 8 1-4 4-7 8-8-6-4-13-2-16 5"
        stroke="#4F6B43"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="70" cy="6" r="1.4" fill="#B6913A" />
    </svg>
  </div>
);

export default function PrecosEvento() {
  useEffect(() => {
    document.title = 'Isabel Pontes Fotografia - Tabela de Preços';

    const els = document.querySelectorAll('.ip-precos .reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <div className="ip-precos ">
      <div className="folder">
        {/* HERO */}
        <div className="hero">
          <div className="brand">
            Isabel Pontes
            <br />
            Fotografia
          </div>
          <div className="tagline">Fotografia ao vivo</div>
          <div className="sub">sua lembrança impressa em minutos ✿</div>
        </div>

        {/* DIVIDER */}
        <BranchDivider />

        {/* FOTO IMPRESSA */}
        <div className="section reveal">
          <div className="eyebrow">Na hora</div>
          <div className="section-title">Foto Impressa</div>
          <p className="section-intro">
            Pose no nosso cantinho, escolha sua melhor cara e leve a foto
            impressa ainda no evento.
          </p>

          <div className="card">
            <div className="card-body">
              <div className="card-top">
                <div className="card-name">1 Foto</div>
                <div className="price">R$40</div>
              </div>
              <div className="card-meta">Pose livre</div>
              <p className="card-desc">
                Uma pose, um clique, uma lembrança na mão na hora.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-top">
                <div className="card-name">Combo 3 Fotos</div>
                <div className="price">R$100</div>
              </div>
              <div className="card-meta">
                R$33 por foto · 3 poses diferentes
              </div>
              <p className="card-desc">
                Três poses diferentes pra registrar mais de um momento do dia.
              </p>
            </div>
          </div>

          <div className="card">
            <span className="badge">Mais completo</span>

            <div className="card-body">
              <div className="card-top">
                <div className="card-name">Combo 5 Fotos</div>
                <div className="price">R$150</div>
              </div>
              <div className="card-meta">
                R$30 por foto · 5 poses diferentes
              </div>
              <p className="card-desc">
                Cinco poses diferentes. O jeito mais completo de levar pra casa.
              </p>
            </div>
          </div>

          <div className="gift">
            <div className="gift-title">Quer presentear alguém especial?</div>
            <p className="gift-desc">
              Mesma foto, impressa de novo. Perfeita pra dividir com quem você
              ama.
            </p>
            <div className="chips">
              <div className="chip">
                <div className="chip-label">Impressa 2x</div>
                <div className="chip-price">R$65</div>
              </div>
              <div className="chip">
                <div className="chip-label">Impressa 3x</div>
                <div className="chip-price">R$85</div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <BranchDivider />

        {/* MINI ENSAIO */}
        <div className="section reveal">
          <div className="eyebrow">Pra guardar</div>
          <div className="section-title">Mini Ensaio </div>
          <p style={{ color: '#911', fontSize: 'bold', marginBottom: '20px' }}>
            Apenas para quem reservar antes do evento!
          </p>

          <p className="section-intro">
            Reserve 15 a 20 minutinhos só seus no nosso cenário. Fotos editadas
            com carinho, prontas em até 7 dias após o evento.
          </p>

          <div className="card">
            <div className="photo-slot">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5230"
                strokeWidth="1.4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              <img src="./imgs_evento_celta/1.jpeg" alt="Exemplo: essencial" />
            </div>
            <div className="card-body">
              <div className="card-top">
                <div className="card-name">Essencial</div>
                <div className="price">R$180</div>
              </div>
              <div className="card-meta">3 fotos editadas · R$60/foto</div>
              <p className="card-desc">
                O ponto de partida pra quem quer um clique mais elaborado.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="photo-slot">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5230"
                strokeWidth="1.4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              <img src="./imgs_evento_celta/3.jpeg" alt="Exemplo: completo" />
            </div>
            <div className="card-body">
              <div className="card-top">
                <div className="card-name">Completo</div>
                <div className="price">R$250</div>
              </div>
              <div className="card-meta">5 fotos editadas · R$50/foto</div>
              <p className="card-desc">
                Mais variedade de poses e momentos pra escolher.
              </p>
            </div>
          </div>

          <div className="card">
            <span className="badge">Mais escolhido</span>
            <div className="photo-slot">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5230"
                strokeWidth="1.4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              <img src="./imgs_evento_celta/2.jpeg" alt="Exemplo: premium" />
            </div>
            <div className="card-body">
              <div className="card-top">
                <div className="card-name">Premium</div>
                <div className="price">R$400</div>
              </div>
              <div className="card-meta">10 fotos editadas · R$40/foto</div>
              <p className="card-desc">
                Pra quem quer aproveitar o máximo do ensaio, com a maior
                variedade de cliques.
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <BranchDivider />

        {/* COMO FUNCIONA */}
        <div className="section reveal" style={{ paddingBottom: '26px' }}>
          <div className="eyebrow">Passo a passo</div>
          <div className="section-title">Como Funciona</div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-text">
                <b>Escolha seu pacote</b> aqui no stand. Foto impressa ou mini
                ensaio.
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-text">
                <b>Pose no cenário</b>. Na hora pra foto impressa, 15 a 20 min
                pro mini ensaio.
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-text">
                <b>Foto impressa?</b> Sai na hora, ainda quentinha, pra você
                levar pra casa.
              </div>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-text">
                <b>Mini ensaio?</b> Edição com carinho, fotos prontas em até 7
                dias.
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="folder-footer">
          <div className="brand">Isabel Pontes</div>
          <div className="note">fotografia</div>
          <div className="contact-edit">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
