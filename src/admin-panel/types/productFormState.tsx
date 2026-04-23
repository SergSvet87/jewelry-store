export type FormValue = string | number | boolean | Record<string, number> | number[] | string[] | null;

export interface ProductStore {
    formData: ProductFormState;
    updateField: (path: string, value: FormValue) => void;
}

export interface ProductFormState {
  name: string;
  price: {
    normalPrice: number | null;
    discountPercentage: number | null;
  };
  productSizes: number[];
  quantity: number | null;
  isNew: boolean;
  categoryName: string;
  collectionName: string;
  description: {
    defaultReturnText: string;
    defaultDeliveryText: string;
    characteristic: {
      metal: string;
      stones: string[];
      color: string;
      averageWeight: number | null;
      size: {
        width: number | null;
        height: number | null;
        length: number | null;
      };
    };
  };
}