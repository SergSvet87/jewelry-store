export interface FilterOption {
  label: string;
  value: string;
}

export const FILTER_BY_DATA: FilterOption[] = [
  { label: 'За тиждень', value: 'WEEK' },
  { label: 'За місяць', value: 'MONTH' }, 
  { label: 'За квартал', value: 'QUARTER' },
  { label: 'За рік', value: 'YEAR' },
];