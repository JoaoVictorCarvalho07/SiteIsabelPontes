import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type Item = { to: string; label: string };

const items: Item[] = [
  { to: '/', label: 'Início' },
  { to: '/galeria', label: 'Galeria' },
  // { to: '/blog', label: 'Blog' },
  // { to: '/parceiros', label: 'Parceiros' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

export function HamburgerMenu({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('md:hidden', className)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-2">
          {items.map((item) => (
            <SheetClose asChild key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-muted',
                    isActive && 'bg-muted font-medium',
                  )
                }
                end={item.to === '/'} // evita "/" ficar ativo em tudo
              >
                {item.label}
              </NavLink>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
