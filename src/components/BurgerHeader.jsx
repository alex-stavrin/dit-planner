import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import routes from '../routes/routes';

function BurgerHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground py-1 px-3">
      <div className="flex h-16 items-center justify-between">
        {/* Mobile Logo */}
        <div className="font-bold md:hidden">Dit Planner</div>
        
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground">
            <nav className="flex flex-col space-y-4 mt-8">
              {routes.map((route) => (
                <RouterLink 
                  key={route.path} 
                  to={route.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm transition-colors",
                    isActive(route.path) 
                      ? "bg-primary-foreground text-primary font-bold" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                  )}
                >
                  {route.name}
                </RouterLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {routes.map((route) => (
            <RouterLink 
              key={route.path} 
              to={route.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm transition-colors",
                isActive(route.path) 
                  ? "bg-primary-foreground/20 text-white font-bold" 
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
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