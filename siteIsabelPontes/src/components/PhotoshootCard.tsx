import { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { Photoshoot } from '@/data/photoshootsInputs';
import { partners } from '@/data/personsData';
import type { Person } from '@/types/person';

interface PhotoshootCardProps {
  photoshoot: Photoshoot;
  onImageClick?: () => void; // Callback para quando a imagem for clicada
}

export function PhotoshootCard({
  photoshoot,
  onImageClick,
}: PhotoshootCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const persons = partners;
  return (
    <Card className="overflow-hidden rounded-2xl border-none bg-white shadow-md transition-all hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-300">
        <img
          src={photoshoot.image_urls?.[0] || undefined}
          loading="lazy"
          decoding="async"
          alt={photoshoot.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          onClick={onImageClick}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-bold text-black">{photoshoot.title}</h3>
          {photoshoot.featured && (
            <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              Destaque
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">
          {new Date(photoshoot.date).toLocaleDateString('pt-BR')} •{' '}
          {photoshoot.location}
        </p>

        <p className="mt-3 text-gray-700">{photoshoot.description}</p>

        <div className="mt-4 space-y-3">
          {/* Concept */}
          <div>
            <p className="text-xs font-semibold uppercase text-gray-600">
              Conceito
            </p>
            <p className="text-sm text-gray-800">{photoshoot.concept}</p>
          </div>

          {/* Models */}
          {photoshoot.models.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase text-gray-600">
                Modelos
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {photoshoot.models?.map((model) => {
                  const person = persons.find((p) => p.id === model);
                  if (!person) return null;
                  return <TeamMemberTag key={person.id} member={person} />;
                })}
              </div>
            </div>
          )}

          {/* Helpers */}
          {photoshoot?.teamMembers?.length &&
            photoshoot?.teamMembers?.length > 0 && (
              <div>
                ''
                <p className="text-xs font-semibold uppercase text-gray-600">
                  Equipe
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {photoshoot?.teamMembers?.map((helper) => {
                    const person = partners.find((p) => p.id === helper);
                    if (!person) return null;
                    return <TeamMemberTag key={helper} member={person} />;
                  })}
                </div>
              </div>
            )}
        </div>

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-sm font-semibold text-black underline transition-all hover:text-gray-700"
        >
          {showDetails ? 'Ocultar detalhes' : 'Ver detalhes da equipe'}
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-6 space-y-4 border-t pt-4">
            {photoshoot.models.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-black">Modelos</h4>
                <div className="space-y-2">
                  {photoshoot.models.map((model) => {
                    const person = persons.find((p) => p.id === model);
                    if (!person) return null;
                    return <TeamMemberDetail key={person.id} member={person} />;
                  })}
                </div>
              </div>
            )}

            {photoshoot?.teamMembers?.length &&
              photoshoot?.teamMembers?.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-black">
                    Equipe de Suporte
                  </h4>
                  <div className="space-y-2">
                    {photoshoot.teamMembers.map((helper) => {
                      const person = partners.find((p) => p.id === helper);
                      if (!person) return null;
                      return <TeamMemberDetail key={helper} member={person} />;
                    })}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </Card>
  );
}

function TeamMemberTag({ member }: { member: Person }) {
  return (
    <a
      href={member.instagram || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-all hover:bg-black hover:text-white"
    >
      <span>{member.name}</span>
      <span className="text-xs opacity-75">({member.role})</span>
    </a>
  );
}

function TeamMemberDetail({ member }: { member: Person }) {
  const roleLabels: Record<Exclude<Person['role'], undefined>, string> = {
    model: 'Modelo',
    stylist: 'Stylist',
    makeup: 'Maquiagem',
    assistant: 'Assistente',
    hair: 'Cabelo',
    producer: 'Produtor',
  };

  return (
    <div className="flex items-start justify-between rounded-lg bg-gray-50 p-3">
      <div>
        <p className="font-medium text-black">{member.name}</p>
        <p className="text-xs text-gray-600">
          {member.role ? roleLabels[member.role] : ''}
        </p>
      </div>
      <div className="flex gap-2">
        {member.instagram && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black hover:underline"
          >
            IG
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black hover:underline"
          >
            Web
          </a>
        )}
      </div>
    </div>
  );
}
