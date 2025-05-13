import routes from '@/routes/routes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function BurgerHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary px-3 py-1 text-primary-foreground">
      <div className="flex h-16 items-center justify-between">
        {/* Mobile Logo */}
        <div className="font-bold md:hidden">Dit Planner</div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary text-primary-foreground">
            <nav className="mt-8 flex flex-col space-y-4">
              {routes.map((route) => (
                <RouterLink
                  key={route.path}
                  to={route.path}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm transition-colors',
                    isActive(route.path)
                      ? 'bg-primary-foreground font-bold text-primary'
                      : 'text-primary-foreground/80 hover:bg-primary/80 hover:text-primary-foreground'
                  )}
                >
                  {route.name}
                </RouterLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-4 md:flex">
          {routes.map((route) => (
            <RouterLink
              key={route.path}
              to={route.path}
              className={cn(
                'rounded-md px-4 py-2 text-sm transition-colors',
                isActive(route.path)
                  ? 'bg-primary-foreground/20 font-bold text-white'
                  : 'text-primary-foreground/80 hover:bg-primary/80 hover:text-primary-foreground'
              )}
            >
              {route.name}
            </RouterLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default BurgerHeader;
