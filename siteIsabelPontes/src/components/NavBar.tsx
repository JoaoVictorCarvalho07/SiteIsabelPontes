import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerMenu } from './HamburgerMenu';
import { cn } from '@/lib/utils';

const DARK_LOGO_ROUTES = ['/sobre', '/contato', '/blog/', '/galeria'];

const NAV_LINKS = [
  { to: '/galeria', label: 'Galeria' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const [logoSrc, setLogoSrc] = useState('/logo/logo_isabel2.png');
  const location = useLocation();

  const isBlogPost =
    location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';
  const isDarkThemePage = DARK_LOGO_ROUTES.includes(location.pathname);
  const textColorClass =
    isDarkThemePage || isBlogPost ? 'text-primary' : 'text-white';

  useEffect(() => {
    const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');

    const updateLogo = () => {
      if (isBlogPost) {
        setLogoSrc('/logo/logo_isabel2.png');
        return;
      }
      setLogoSrc(
        !isDarkThemePage
          ? '/logo/logo_isabel_branca.png'
          : mediaDark.matches
            ? '/logo/logo_isabel_branca.png'
            : '/logo/logo_isabel2.png',
      );
    };

    updateLogo();
    mediaDark.addEventListener('change', updateLogo);
    return () => mediaDark.removeEventListener('change', updateLogo);
  }, [location.pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 25) {
        setVisible(true);
        lastY.current = y;
        return;
      }

      if (Math.abs(delta) < 8) return;

      setVisible(delta < 0);
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        `${textColorClass} border-b w-full fixed top-0 left-0 right-0 z-50 justify-end px-5 py-3`,
        'transition-all duration-300 bg-transparent border-transparent',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className={cn(
            'font-bold max-w-50',
            visible ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-600',
          )}
        >
          <img src={logoSrc} alt="" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="transition-opacity hover:opacity-75 hover:scale-125"
            >
              {label}
            </Link>
          ))}
        </nav>

        <HamburgerMenu className="text-black" />
      </div>
    </header>
  );
}
