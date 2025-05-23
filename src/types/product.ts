export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  categoryName?: string;
  isLarge?: boolean;
  collectionName?: string;
  rating: number;
  quantity: number
}

export interface ISingleProduct extends Product {
  material?: string[];
  color?: string;
  weight?: number;
  size?: string;
  code?: string;
  gemstoneUsed?: boolean;
  gemstone?: string | null;
}
