import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetDishUseCase } from './usecase/get-dish.use-case';
import { Dish } from '../../domain/Dish';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  private readonly logger = new Logger(DishesController.name);

  constructor(private getDishUseCase: GetDishUseCase) {}

  @Get(':id')
  async getProject(@Param('id') id: string): Promise<Dish> {
    this.logger.log(`Retrieving dish ${id}`);
    const dish = await this.getDishUseCase.invoke(+id);
    return dish;
  }
}
