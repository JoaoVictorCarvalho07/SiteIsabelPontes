import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EditorialCardProps {
  title: string;
  description: string;
  image: string;
  /** URL externa (http) ou rota interna (/rota) */
  href: string;
  className?: string;
}

export default function EditorialCard({
  title,
  description,
  image,
  href,
  className,
}: EditorialCardProps) {
  const isExternal = href.startsWith('http');

  const inner = (
    <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* overlay escurece levemente no hover */}
      <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
      {/* texto no rodapé do card */}
      <div className="relative z-10 flex h-full items-end p-6">
        <div>
          <h3 className="type-h3 text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/80">{description}</p>
        </div>
      </div>
    </div>
  );

  const wrapperClass = cn(
    'group block rounded-3xl transition-shadow duration-300 hover:shadow-xl',
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={wrapperClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} className={wrapperClass}>
      {inner}
    </Link>
  );
}
