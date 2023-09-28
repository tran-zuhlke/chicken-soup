import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetDishUseCase } from './usecase/get-dish.use-case';
import { Dish } from '../../domain/Dish';
import { GetDishesUseCase } from './usecase/get-dishes.use-case';
import { UpdateDishUseCase } from './usecase/update-dish.use-case';
import { CreateDishUseCase } from './usecase/create-dish.use-case';
import { DeleteDishUseCase } from './usecase/delete-dish.use-case';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  private readonly logger = new Logger(DishesController.name);

  constructor(
    private getDishUseCase: GetDishUseCase,
    private getDishesUseCase: GetDishesUseCase,
    private updateDishUseCase: UpdateDishUseCase,
    private createDishUseCase: CreateDishUseCase,
    private deleteDishUseCase: DeleteDishUseCase
  ) {}

  @Get(':id')
  async getDish(@Param('id') id: string): Promise<Dish> {
    this.logger.log(`Retrieving dish ${id}`);
    return await this.getDishUseCase.invoke(id);
  }

  @Get()
  async getDishes(): Promise<Dish[]> {
    this.logger.log(`Retrieving dishes`);
    return await this.getDishesUseCase.invoke();
  }

  @Put()
  async updateDish(@Body() dish: Dish): Promise<Dish> {
    this.logger.log(`Updating dish ${dish.id}`);
    return await this.updateDishUseCase.invoke(dish);
  }

  @Post()
  async createDish(@Body() dish: Dish): Promise<Dish> {
    this.logger.log(`Creating dish ${dish.title}`);
    return await this.createDishUseCase.invoke(dish);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: string): Promise<Dish> {
    this.logger.log(`Deleting dish ${id}`);
    return await this.deleteDishUseCase.invoke(id);
  }
}
