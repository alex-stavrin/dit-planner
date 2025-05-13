import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar({searchQuery, setSearchQuery}) {
  return (
    <div className="flex justify-start items-center gap-1 flex-grow relative">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="pl-9 w-full"
        />
      </div>
    </div>
  );
};

