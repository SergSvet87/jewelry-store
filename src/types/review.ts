export interface Review {
  rating: number;
  date: string;
  text: string;
  customerName: string;
  location: string;
  image?: string;
  hasProductImage?: boolean;
}
