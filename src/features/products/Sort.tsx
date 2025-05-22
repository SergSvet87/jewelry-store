import { useState } from 'react';
import cn from 'classnames';

import { sortOptions } from '@/mock';
import { ArrowDownIcon, SortIcon } from '@/assets';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export const Sort = ({ sort, setSort }: { sort: string; setSort: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedSortName = Object.values(sortOptions).find((s) => s.value === sort)?.label;

  const handleSelect = (value: string) => {
    setSort(value);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="max-w-[250px] flex items-center gap-3 cursor-pointer text-[length:var(--text)] target:border-b-2 target:border[var(--button)]">
        <SortIcon />
        {selectedSortName || sortOptions[0].label}
        <ArrowDownIcon
          classname={cn('w-5 h-5 transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </PopoverTrigger>

      <PopoverContent className="relative top-2 z-1000 w-[280px] min-h-[170px] p-0 m-0 bg-[var(--main)] flex flex-col text-start">
        {sortOptions.map((opt) => (
          <div
            className={
              cn(opt.label === selectedSortName && 'bg-[var(--button)] text-[var(--main)] ') +
              'px-9 py-3 cursor-pointer w-full hover:bg-[var(--accent)]'
            }
            onClick={() => handleSelect(opt.value)}
            key={opt.value}
          >
            {opt.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
