import { Injectable, Logger } from '@nestjs/common';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';
import prisma from '../../../../lib/prisma';

@Injectable()
export class GetDishesUseCase {
  private readonly logger = new Logger(GetDishesUseCase.name);

  async invoke(): Promise<Dish[]> {
    this.logger.debug(`Invoked ${GetDishesUseCase.name}`);

    const dishes: DishDbEntity[] = await prisma.dish.findMany({
      where: {
        active: true,
      },
    });

    return dishes.map((dish) => mapDishFromDbEntity(dish)).sort((left, right) => (left.title < right.title ? -1 : 1));
  }
}
