import { UserDishDbEntity } from '../persistence/userDish.entity';

export interface UserDish {
  id: string;
  userId: string;
  dishId: string;
  createdAt: Date;
}

export const mapUserDishFromDbEntity = (userDishDbEntity: UserDishDbEntity): UserDish => ({
  id: userDishDbEntity.id,
  userId: userDishDbEntity.userId,
  dishId: userDishDbEntity.dishId,
  createdAt: userDishDbEntity.createdAt,
});
