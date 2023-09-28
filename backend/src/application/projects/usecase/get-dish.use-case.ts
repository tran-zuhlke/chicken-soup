import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishDbEntity } from '../../../persistence/dish.entity';
import { Dish, mapDishFromDbEntity } from '../../../domain/Dish';

@Injectable()
export class GetDishUseCase {
  private readonly logger = new Logger(GetDishUseCase.name);

  constructor(
    @InjectRepository(DishDbEntity)
    private dishesRepository: Repository<DishDbEntity>
  ) {}

  async invoke(dishId: number): Promise<Dish> {
    this.logger.debug(`Invoked ${GetDishUseCase.name} for dishId ${dishId}`);
    const dishDbEntity = await this.dishesRepository.findOne({
      where: { id: dishId },
    });
    return mapDishFromDbEntity(dishDbEntity);
  }
}
