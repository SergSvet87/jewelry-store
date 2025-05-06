export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface ISingleProduct extends Product {
  collection: string;
  rating: number;
  material: string[];
  color: string;
  weight: number;
  size: string;
  code: string;
  gemstoneUsed: boolean;
  gemstone: string | null;
}
