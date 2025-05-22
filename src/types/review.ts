export interface IReviewItem {
  id: number,
  rating: number;
  date: string;
  text: string;
  customerName: string;
  location: string;
  image?: string;
  hasProductImage?: boolean;
  avatar?: string;
}
