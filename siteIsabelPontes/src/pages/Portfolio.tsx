import { useMemo, useState } from 'react';
import { portfolioProjects } from '@/data/portfolioData';
import { photoshootsById } from '@/data/photoshootsData'; // ✅ seu formato: { Projeto: Photoshoot[] }
import { PhotoshootCard } from '@/components/PhotoshootCard';
import { Button } from '@/components/ui/button';
import type { ProjectCategory } from '@/types/portfolio';
import { CarouselSpacing } from '@/components/CarouselSpacing';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/Modal';
import type { Photoshoot } from '@/types/photoshoot';

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  editorial: 'Editorial',
  'direção-criativa': 'Direção Criativa',
  'mídia-kit': 'Mídia Kit',
  conceitual: 'Conceitual',
  independentes: 'Independentes',
};

type PhotoshootsByProject = Record<string, Photoshoot[]>;

export default function Portfolio() {
  const [selectedPhotoshootId, setSelectedPhotoshootId] = useState<
    string | null
  >(null);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolioProjects
      : selectedCategory === 'independentes'
        ? portfolioProjects.filter((p) => p.id === 'independentes')
        : portfolioProjects.filter((p) => p.category === selectedCategory);

  const shootsMap = photoshootsById as PhotoshootsByProject;
  // ✅ resolve projects -> shoots (usando a key do projeto)
  // Como você disse: o id do projeto = nome da pasta do projeto (key no map)
  const resolvedProjects = useMemo(() => {
    return filteredProjects.map((project) => {
      const shoots = shootsMap[project.id] ?? shootsMap[project.title] ?? [];
      // ^ fallback: se sua key estiver como title (Afrodite) e seu id for slug (afrodite)
      return { project, shoots };
    });
  }, [filteredProjects, shootsMap]);

  // ✅ acha o photoshoot sele  cionado (procura em todos os projetos)
  const selectedShoot = useMemo(() => {
    if (!selectedPhotoshootId) return null;
    for (const key in shootsMap) {
      const found = shootsMap[key]?.find((s) => s.id === selectedPhotoshootId);
      if (found) return found;
    }
    return null;
  }, [selectedPhotoshootId, shootsMap]);

  console.log('Resolved Projects:', resolvedProjects);

  return (
    <>
      <main
        className={cn(
          'min-h-screen bg-background text-foreground',
          visible ? 'blur-sm' : '',
        )}
      >
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-96 overflow-hidden">
          <video
            src="./hero/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full items-end">
            <div className="mx-auto w-full max-w-6xl px-6 pb-20 text-white">
              <h1 className="max-w-2xl text-5xl font-bold leading-tight">
                Portfólio de Trabalhos
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/90">
                Direção criativa, fotografia artística, storytelling e produção
                de conteúdo.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as ProjectCategory)}
                className={`px-6 py-2 rounded-full transition-all font-medium ${
                  selectedCategory === key
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-16">
            {resolvedProjects.map(({ project, shoots }) => (
              <div key={project.id} className="border-b pb-16 last:border-b-0">
                {/* Project Header */}
                <div className="mb-8">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-4xl font-bold text-foreground">
                        {project.title}
                      </h2>
                      <p className="mt-2 inline-block rounded-full bg-gray-200 px-4 py-1 text-sm font-semibold text-gray-700">
                        {categoryLabels[project.category]}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-2xl text-lg text-foreground">
                    {project.description}
                  </p>
                </div>

                {/* Project Image */}
                {selectedCategory !== 'independentes' && (
                  <div className="mb-8 h-80 sm:h-100 md:h-120 overflow-hidden rounded-2xl bg-gray-300 ">
                    <img
                      src={shoots[0]?.image_urls?.[0] || project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105 object-[80%_20%]"
                    />
                  </div>
                )}

                {/* Photoshoots */}
                {shoots.length > 0 && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-foreground">
                        Fotosessões ({shoots.length})
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Conheça os detalhes de cada sessão, modelos e equipe de
                        produção
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {shoots.map((photoshoot) => (
                        <PhotoshootCard
                          key={photoshoot.id}
                          photoshoot={photoshoot}
                          onImageClick={() => {
                            setVisible(true);
                            setSelectedPhotoshootId(photoshoot.id);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Expand */}
                {shoots.length > 0 && (
                  <div className="mt-8">
                    <button
                      onClick={() =>
                        setExpandedProject(
                          expandedProject === project.id ? null : project.id,
                        )
                      }
                      className="text-sm font-semibold text-foreground underline transition-all hover:text-gray-700"
                    >
                      {expandedProject === project.id
                        ? 'Ocultar informações adicionais'
                        : 'Mostrar mais informações'}
                    </button>

                    {expandedProject === project.id && (
                      <div className="mt-6 space-y-4 rounded-lg bg-gray-50 p-6">
                        <div>
                          <h4 className="mb-3 font-bold text-black">
                            Total de Pessoas Envolvidas
                          </h4>
                          <p className="text-gray-700">
                            Modelos:{' '}
                            {shoots.reduce(
                              (acc, s) => acc + (s.models?.length ?? 0),
                              0,
                            )}
                          </p>
                          <p className="text-gray-700">
                            Equipe:{' '}
                            {shoots.reduce(
                              (acc, s) => acc + (s.teamMembers?.length ?? 0),
                              0,
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-black py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white">
              Interessado em Colaborar?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Se você é um modelo, stylist, produtor ou parceiro potencial,
              gostaria de conversar sobre seu próximo projeto.
            </p>
            <a href="/contato" className="mt-8 inline-block">
              <Button className="bg-white text-black hover:bg-gray-100">
                Entre em Contato
              </Button>
            </a>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Modal
        open={visible}
        onClose={() => {
          setVisible(false);
          setSelectedPhotoshootId(null);
        }}
      >
        <CarouselSpacing
          gridof={true}
          className={cn('max-w-full z-500', visible ? 'visible' : 'invisible')}
          items={
            selectedShoot?.image_urls?.map((src, index) => ({
              src,
              alt: `Foto da sessão ${index + 1}`,
            })) || []
          }
        />
      </Modal>
    </>
  );
}
