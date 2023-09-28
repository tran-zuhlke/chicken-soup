import { DishDbEntity } from '../persistence/dish.entity';

export interface Dish {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  createdAt: Date;
}

export const mapDishFromDbEntity = (dishDbEntity: DishDbEntity): Dish => ({
  id: dishDbEntity.id,
  title: dishDbEntity.title,
  price: dishDbEntity.price,
  imageUrl: dishDbEntity.imageUrl,
  createdAt: dishDbEntity.createdAt,
});
