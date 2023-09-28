import { Injectable, Logger } from '@nestjs/common';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';
import prisma from '../../../../lib/prisma';

@Injectable()
export class GetDishUseCase {
  private readonly logger = new Logger(GetDishUseCase.name);

  async invoke(dishId: string): Promise<Dish> {
    this.logger.debug(`Invoked ${GetDishUseCase.name} for dishId ${dishId}`);

    // Update dish example
    // await prisma.dish.update({
    //   where: { id: dishId.toString() },
    //   data: { active: true },
    // });

    // Create dish example
    // await prisma.dish.create({
    //   data: {
    //     title: 'Mực chiên',
    //     price: 55000,
    //     createdAt: new Date(),
    //   },
    // });

    const dish: DishDbEntity = await prisma.dish.findFirst({
      where: {
        id: dishId,
      },
    });

    return mapDishFromDbEntity(dish);
  }
}
