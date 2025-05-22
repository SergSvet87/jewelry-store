import { useState } from 'react';
import { Input } from '@/components/ui/input';

import { SearchIcon, X } from '@/assets';

export const SearchDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed top-[100px] h-[50px] left-0 w-full z-50 bg-[var(--main)] border-b-2 border-[var(--brown-dark)]">
      <div className="container h-full flex items-center gap-2 ">
        <SearchIcon fill="var(--brown-dark)" />
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
