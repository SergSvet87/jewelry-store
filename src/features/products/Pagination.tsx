import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useEffect } from 'react';

import { ChevronRight } from '@/assets';
import { useCatalogStore } from '@/store';
import { getQueryParams, setQueryParams } from '@/utils/urlParams';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, totalPages, setPage } = useCatalogStore();

  const handlePageChange = (newPage: number) => {
    setPage(newPage)

    setSearchParams(
      setQueryParams({
        ...getQueryParams(searchParams),
        page: newPage,
      }),
    );
  };

  useEffect(() => {
    const urlPage = Number(searchParams.get('page') || 1);
    if(urlPage !== page) {
      setPage(urlPage);
    }
  },[searchParams, setPage, page])

  return (
    <div className="w-full flex items-center justify-center h-7 mb-5 mt-5 ">
      <div className="min-w-[541px] flex items-center justify-between gap-2  ">
        <button
          className={cn(
            'btn hover:text-accent transition-all duration-300',
            page === 1 && 'cursor-default text-grey hover:text-grey',
          )}
          onClick={handlePageChange.bind(null, page - 1)}
          disabled={page === 1}
        >
          <ChevronRight classname="w-5 h-5 transform rotate-180" />
        </button>

        <div className="flex items-center flex-row gap-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={handlePageChange.bind(null, p)}
              className={cn(
                'w-7 h-7 px-[10.5px] py-[3.5px] border-[0.5px] border-solid cursor-pointer flex items-center justify-center hover:border-brown-dark hover:text-accent transition-all duration-300',
                page === p ? 'border-brown-dark' : 'border-transparent',
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className={cn(
            'btn hover:text-accent transition-all duration-300',
            page === totalPages && 'cursor-default text-grey hover:text-grey',
          )}
          onClick={handlePageChange.bind(null, page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight classname="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
