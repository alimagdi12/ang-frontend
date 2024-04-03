export interface Product {
  _id: string;
  category: string;
  title: string;
  price: number;
  description: string;
  details: string;
  imageUrl: string;
  rating?: number;
}
