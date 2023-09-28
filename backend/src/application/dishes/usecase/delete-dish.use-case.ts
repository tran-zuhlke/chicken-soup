import { Injectable, Logger } from '@nestjs/common';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';
import prisma from '../../../../lib/prisma';
import { ValidationException } from '../../exceptions/ValidationException';

@Injectable()
export class DeleteDishUseCase {
  private readonly logger = new Logger(DeleteDishUseCase.name);

  async invoke(id: string): Promise<Dish> {
    this.logger.debug(`Invoked ${DeleteDishUseCase.name} for ${id}`);

    const userDishes = await prisma.userDish.count({
      where: { dishId: id },
    });
    if (userDishes > 0) {
      throw new ValidationException(`There are users have chosen this dish ${id}`);
    }

    const deletedDish = await prisma.dish.delete({
      where: { id: id },
    });

    return deletedDish;
  }
}
