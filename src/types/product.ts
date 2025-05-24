export interface ProductItem {
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

export interface ISingleProduct extends ProductItem {
  material?: string[];
  color?: string;
  weight?: number;
  size?: string;
  code?: string;
  gemstoneUsed?: boolean;
  gemstone?: string | null;
}

export interface Product {
  id: number;
  name: string;
  productSizes: number[];
  price: number;
  quantity: number;
  sku: string;
  categoryName: string;
  collectionName: string;
  description: {
    defaultReturnText: string;
    defaultDeliveryText: string;
    characteristic: {
      metal: string;
      stone: string;
      color: string;
      averageWeight: number;
      size: {
        width: number;
        height: number;
        length: number;
      };
    };
  };
}
