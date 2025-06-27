import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { sortOptions } from '@/mock';
import { useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { ArrowDownIcon, SortIcon } from '@/assets';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const {
    selectedCategories,
    selectedCollections,
    selectedMaterials,
    priceRange,
    sort,
  } = useCatalogStore();

  const selectedSort = sortOptions.find((opt) => opt.value === sort);

  const handleSortChange = (value: string) => {
    useCatalogStore.getState().setSort(value);
    useCatalogStore.getState().setPage(1);

    setSearchParams(
      setQueryParams({
        page: 1,
        direction: value,
        category: selectedCategories,
        collection: selectedCollections,
        material: selectedMaterials,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      }),
    );

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="max-w-[250px] flex items-center gap-3 cursor-pointer text-second target:border-b-2 target:border-button">
        <SortIcon />
        {selectedSort ? selectedSort.label : 'За популярністю'}
        <ArrowDownIcon
          classname={cn('w-5 h-5 transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </PopoverTrigger>

      <PopoverContent className="relative top-2 z-1000 w-[280px] min-h-[170px] p-0 m-0 bg-main flex flex-col text-start">
        {sortOptions.map((opt) => (
          <div
            className={
              cn(opt.value === sort && 'bg-button text-main ') +
              'px-9 py-3 cursor-pointer w-full hover:bg-accent'
            }
            onClick={() => handleSortChange(opt.value)}
            key={opt.value}
          >
            {opt.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
