import { Injectable, Logger } from '@nestjs/common';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';
import prisma from '../../../../lib/prisma';

@Injectable()
export class UpdateDishUseCase {
  private readonly logger = new Logger(UpdateDishUseCase.name);

  async invoke(dishToUpdate: Dish): Promise<Dish> {
    this.logger.debug(`Invoked ${UpdateDishUseCase.name} for dishId ${dishToUpdate.id}`);

    const updatedDish: DishDbEntity = await prisma.dish.update({
      where: { id: dishToUpdate.id },
      data: { ...dishToUpdate },
    });

    return mapDishFromDbEntity(updatedDish);
  }
}
