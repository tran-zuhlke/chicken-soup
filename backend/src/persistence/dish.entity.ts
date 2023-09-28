export class DishDbEntity {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  active: boolean;
  createdAt: Date;
}
