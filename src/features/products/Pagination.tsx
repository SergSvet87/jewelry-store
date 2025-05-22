import { FC } from 'react';
import cn from 'classnames';

import { ChevronRight } from '@/assets';

interface IPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({ page, totalPages, setPage }) => {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-full flex items-center justify-center h-7">
      <div className="min-w-[541px] flex items-center justify-between gap-2 ">
        <button
          className={cn('btn', page === 1 && 'cursor-default')}
          onClick={handlePrev}
          disabled={page === 1}
        >
          <ChevronRight classname="w-5 h-5 transform rotate-180" />
        </button>
        <div className="flex items-center flex-row gap-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                'w-7 h-7 px-[10.5px] py-[3.5px] border-[0.5px] cursor-pointer flex items-center justify-center hover:border-[var(--brown-dark)] hover:text-[var(--accent)] transition-all duration-300',
                page === p ? 'border-[var(--brown-dark)]' : 'border-transparent',
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          className={cn('btn', page === totalPages && 'cursor-default')}
          onClick={handleNext}
          disabled={page === totalPages}
        >
          <ChevronRight classname="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
