import { useEffect, useState } from 'react';
import { getSearchProducts } from '@/services';
import { IProductItem } from '@/types/';

export const useSearch = (query: string) => {
  const [results, setResults] = useState<IProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getSearchProducts(
          1,
          query, // category
          query, // collection
          query, // name
          query, // stone
          query, // color
          query  // metal
        );

        setResults(res.content);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { results, isLoading };
};
