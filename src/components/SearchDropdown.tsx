import { useState } from 'react';
import { Input } from '@/components/ui/input';

import { SearchIcon, X } from '@/assets';

export const SearchDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed lg:top-[100px] top-[80px] lg:h-[50px] h-[40px] left-0 w-full z-50 bg-main border-b-2 border-brown-dark">
      <div className="container h-full flex items-center gap-2 ">
        <SearchIcon classname="text-brown-dark" />
        <Input
          placeholder="Що шукаєте?"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-0 border-0 outline-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0"
        />

        <button className="btn" onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  );
};
