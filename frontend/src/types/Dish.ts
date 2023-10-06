export interface Dish {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  createdAt: Date;
}
