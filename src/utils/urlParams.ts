import { IFilterParams } from "../types/";

export const getQueryParams = (searchParams: URLSearchParams): IFilterParams => {

  const parseArray = (key: string): string[] => {
    const val = searchParams.get(key);
    if (!val) return [];
    try {
      return val.replace(/^\[|\]$/g, '').split(',').filter(Boolean);
    } catch {
      return [];
    }
  };


  const getNumber = (key: string): number | undefined => {
    const val = searchParams.get(key);
    return val ? Number(val) : undefined;
  };

  return {
    category: parseArray('category'),
    collection: parseArray('collection'),
    material: parseArray('material'),
    direction: searchParams.get('sort') || undefined,
    page: getNumber('page'),
    minPrice: getNumber('minPrice'),
    maxPrice: getNumber('maxPrice'),
  };
};

export const setQueryParams = (params: IFilterParams): string => {
  const searchParams = new URLSearchParams();

  const addArrayAsStringifiedList = (key: string, values?: string[]) => {
    if (values && values.length > 0) {
      searchParams.set(key, `[${values.join(',')}]`);
    }
  };

  const addNumber = (key: string, value?: number) => {
    if (value !== undefined && !isNaN(value)) {
      searchParams.set(key, value.toString());
    }
  };

  addArrayAsStringifiedList('category', params.category);
  addArrayAsStringifiedList('collection', params.collection);
  addArrayAsStringifiedList('material', params.material);

  if (params.direction) searchParams.set('sort', params.direction);
  addNumber('page', params.page);
  addNumber('minPrice', params.minPrice);
  addNumber('maxPrice', params.maxPrice);

  return `?${searchParams.toString()}`;
};
