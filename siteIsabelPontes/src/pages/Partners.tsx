import { useState } from 'react';
import { partners } from '@/data/partners';
import { PartnerCard } from '@/components/PartnerCard';
import type { PersonCategory } from '@/types/person';
import type { Person } from '@/types/person';

const categoryLabels: Record<PersonCategory, string> = {
  models: 'Modelos',
  agências: 'Agências',
  stylists: 'Stylists',
  brands: 'Marcas',
  makeup: 'Maquiagem & Cabelo',
};

export default function Partners({ partner }: { partner?: Person }) {
  const [selectedCategory, setSelectedCategory] =
    useState<PersonCategory | null>(null);

  const filteredPartners = selectedCategory
    ? partners.filter((p) => p.category === selectedCategory)
    : partners;

  const categories: PersonCategory[] = [
    'models',
    'agências',
    'stylists',
    'brands',
    'makeup',
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-96 overflow-hidden bg-background">
        <video
          src="./hero/hero_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-20 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Parceiros & Colaboradores
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Conheça os talentos incríveis que fazem parte do meu universo
              criativo
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all font-medium ${
              selectedCategory === null
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Info Text */}
        {selectedCategory && (
          <div className="mb-12 rounded-lg bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-black">
              {categoryLabels[selectedCategory]}
            </h2>
            <p className="mt-2 text-gray-700">
              {filteredPartners.length}{' '}
              {filteredPartners.length === 1 ? 'parceiro' : 'parceiros'} nesta
              categoria
            </p>
          </div>
        )}

        {/* Partners Grid */}
        <div
          id={partner?.id}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Nenhum parceiro encontrado nesta categoria.
            </p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="mt-16 bg-black py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Quer Ser Parceiro?</h2>
          <p className="mt-4 text-lg text-white/90">
            Estou sempre aberta para colaborações que tragam criatividade e
            autenticidade. Vamos criar algo extraordinário juntos!
          </p>
          <a href="/contato" className="mt-8 inline-block">
            <button className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition-all hover:bg-gray-100">
              Entrar em Contato
            </button>
          </a>
        </div>
      </section>

      {/* Featured Partners Section */}
      {selectedCategory === null && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold text-primary">
            Parcerias Especiais
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {partners
              .filter((p) => p.testimonial)
              .slice(0, 2)
              .map((partner) => (
                <div key={partner.id} className="rounded-lg bg-gray-50 p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-black">{partner.name}</h3>
                      <p className="text-sm text-gray-600">
                        {categoryLabels[partner.category]}
                      </p>
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-black pl-4 italic text-gray-800">
                    "{partner.testimonial}"
                  </blockquote>
                </div>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
