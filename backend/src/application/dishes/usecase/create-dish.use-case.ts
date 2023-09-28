import { Injectable, Logger } from '@nestjs/common';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';
import prisma from '../../../../lib/prisma';

@Injectable()
export class CreateDishUseCase {
  private readonly logger = new Logger(CreateDishUseCase.name);

  async invoke(dishToCreate: Dish): Promise<Dish> {
    this.logger.debug(`Invoked ${CreateDishUseCase.name} for ${dishToCreate.title}`);

    const updatedDish: DishDbEntity = await prisma.dish.create({
      data: { ...dishToCreate, active: true, createdAt: new Date() },
    });

    return mapDishFromDbEntity(updatedDish);
  }
}
