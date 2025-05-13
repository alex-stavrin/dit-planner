import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative flex flex-grow items-center justify-start gap-1">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9"
        />
      </div>
    </div>
  );
}
