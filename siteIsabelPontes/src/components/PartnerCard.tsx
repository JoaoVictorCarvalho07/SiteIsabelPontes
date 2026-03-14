import type { Person, PersonCategory } from '@/types/person';
import { Card } from '@/components/ui/card';

interface PartnerCardProps {
  partner: Person;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card  className="overflow-hidden rounded-xl border-none bg-white shadow-md transition-all hover:shadow-lg">
      {/* Image Section */}
      <div id={partner.id} className="relative h-48 overflow-hidden bg-gray-300">
        <img
          src={partner.image}
          alt={partner.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-black">{partner.name}</h3>
        <p className="mt-1 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
          {getCategoryLabel(partner.category)}
        </p>

        <p className="mt-4 text-gray-700">{partner.description}</p>

        {/* Testimonial */}
        {partner.testimonial && (
          <div className="mt-4 border-l-4 border-black bg-gray-50 p-4">
            <p className="italic text-gray-800">"{partner.testimonial}"</p>
            <p className="mt-2 text-sm font-semibold text-gray-600">
              — {partner.name}
            </p>
          </div>
        )}

        {/* Links */}
        <div className="mt-6 flex gap-3">
          {partner.instagram && (
            <a
              href={partner.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-black py-2 text-center font-semibold text-white transition-all hover:bg-gray-800"
            >
              Instagram
            </a>
          )}
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border-2 border-black bg-white py-2 text-center font-semibold text-black transition-all hover:bg-gray-100"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function getCategoryLabel(category: Person['category']): string {
  if (!category) return '';
  const labels: Record<PersonCategory, string> = {
    models: 'Modelos',
    agências: 'Agências',
    stylists: 'Stylists',
    brands: 'Marcas',
    makeup: 'Maquiagem & Cabelo',
  };
  return category ? labels[category] : 'Parceiro';
}
