import useSWR from 'swr';

import { ApiEndpoint, HttpMethod } from '@/enums';
import { request } from '@/api/requestService';
import { useCatalogStore } from '@/store/catalog/useCatalogStore';

export const useCatalogData = () => {
  const setCategories = useCatalogStore((s) => s.setCategories);
  const setCollections = useCatalogStore((s) => s.setCollections);

  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR(`${ApiEndpoint.CATEGORIES}`, (url) =>
    request({ url, method: HttpMethod.GET }).then((data) => {
      setCategories(data);
      return data;
    })
  );

  const {
    data: collections,
    error: collectionsError,
    isLoading: isCollectionsLoading,
  } = useSWR(`${ApiEndpoint.COLLECTIONS}`, (url) =>
    request({ url, method: HttpMethod.GET }).then((data) => {
      setCollections(data);
      return data;
    })
  );

  return {
    categories,
    collections,
    isLoading: isCategoriesLoading || isCollectionsLoading,
    error: categoriesError || collectionsError,
  };
};