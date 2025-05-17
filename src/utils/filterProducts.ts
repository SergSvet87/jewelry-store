import { ISingleProduct } from "../types/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterProducts = (products: ISingleProduct[], filters: any) => {
  let filtered = [...products];

  const { selectedCategories, selectedCollections, selectedMaterials, priceRange } = filters;

  if (selectedCategories.length) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category));
  }

  if (selectedCollections.length) {
    filtered = filtered.filter((p) => selectedCollections.includes(p.collection));
  }

  if (selectedMaterials.length) {
    filtered = filtered.filter((p) => selectedMaterials.includes(p.material));
  }

  if (priceRange) {
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }

  return filtered;
}