import { cn } from '@/lib/utils';

export default function ContactSection() {
  const WHATSAPP_NUMBER_E164 = '554191977011';
  const INSTAGRAM_URL = 'https://instagram.com/isapontesfoto';
  const EMAIL = 'isabelpontesfotografia@gmail.com';
  const CITY = 'Curitiba, PR';
  const RESPONSE_TIME = 'em até 24h úteis';

  const waText = encodeURIComponent(
    'Oi! Vim pelo seu site ✨\n\nQuero falar sobre: (ensaio / evento / UGC)\nData/cidade: \nReferências (se tiver): \n',
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${waText}`;
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Contato pelo site',
  )}&body=${encodeURIComponent('Oi! Vim pelo seu site ✨\n\nQuero falar sobre:\n')}`;

  return (
    <section id="contato" className="w-full pt-12 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h2 className="type-h2">Contato</h2>
          <p className="mt-2 type-body text-muted-foreground">
            Me chama por onde for melhor — eu respondo {RESPONSE_TIME}. 🤍
          </p>
        </div>

        {/* Cards de contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContactCard
            title="WhatsApp"
            description="Mais rápido para orçamento e disponibilidade."
            href={whatsappHref}
            cta="Chamar no WhatsApp"
            highlight
          />
          <ContactCard
            title="Instagram"
            description="Bate-papo, referências e bastidores."
            href={INSTAGRAM_URL}
            cta="Abrir Instagram"
          />
          <ContactCard
            title="E-mail"
            description="Para propostas, marcas e demandas formais."
            href={mailtoHref}
            cta="Enviar e-mail"
          />
        </div>

        {/* Info extra */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-background/60 backdrop-blur p-6">
            <h3 className="type-h3">Como falar comigo</h3>
            <ul className="mt-3 space-y-2 type-body text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground font-medium">•</span>
                <span>Me diga o que você procura (ensaio / evento / UGC).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-medium">•</span>
                <span>Se tiver, mande tema + referências (Pinterest/prints).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-medium">•</span>
                <span>Data e cidade ajudam a eu te responder mais rápido.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-6">
            <h3 className="type-h3">Atendimento</h3>
            <p className="mt-3 type-body text-muted-foreground">
              Base em{' '}
              <span className="text-foreground font-medium">{CITY}</span>.
              Outros locais sob consulta.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Ensaios artísticos', 'Direção de arte', 'Conteúdo / UGC'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border type-label"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 type-body font-bold text-muted-foreground">
          Dica: se preferir, pode mandar só "vim pelo site" que eu te guio com
          as perguntas ✨
        </p>
      </div>
    </section>
  );
}

interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  cta: string;
  highlight?: boolean;
}

function ContactCard({ title, description, href, cta, highlight }: ContactCardProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'group flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-200',
        highlight
          ? 'bg-foreground text-background border-foreground hover:bg-foreground/90'
          : 'bg-card hover:border-primary/40 hover:shadow-md',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={cn('type-h3', highlight && 'text-background')}>
            {title}
          </h3>
          <p
            className={cn(
              'mt-2 type-body text-sm',
              highlight ? 'text-background/70' : 'text-muted-foreground',
            )}
          >
            {description}
          </p>
        </div>

        <span
          className={cn(
            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:translate-x-0.5',
            highlight
              ? 'border-background/30 text-background'
              : 'border-muted-foreground/20',
          )}
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <div
        className={cn(
          'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border transition',
          highlight
            ? 'border-background/30 text-background group-hover:bg-background/10'
            : 'border-muted-foreground/20 text-foreground group-hover:bg-muted/50',
        )}
      >
        {cta}
      </div>
    </a>
  );
}
