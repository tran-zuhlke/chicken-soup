import { DishDbEntity } from '../persistence/dish.entity';
export interface Dish {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export const mapDishFromDbEntity = (dishDbEntity: DishDbEntity): Dish => ({
  id: dishDbEntity.id.toString(),
  title: dishDbEntity.title,
  price: dishDbEntity.price,
  imageUrl: dishDbEntity.imageUrl,
  createdAt: dishDbEntity.createdAt,
});
