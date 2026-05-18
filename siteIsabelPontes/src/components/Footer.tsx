import { Link } from 'react-router-dom';

const INSTAGRAM_URL = 'https://instagram.com/isapontesfoto';

const NAV_LINKS = [
  { to: '/galeria', label: 'Galeria' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-4 py-12 px-6">
      <nav className="flex items-center gap-6 text-sm">
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Instagram
        </a>
      </nav>
      <p className="type-caption text-muted-foreground">
        © {year} Isabel Pontes · Todos os direitos reservados
      </p>
    </footer>
  );
}
