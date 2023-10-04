import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DishesController } from '../dishes/dishes.controller';
import { GetDishUseCase } from '../dishes/usecase/get-dish.use-case';
import { GetDishesUseCase } from './usecase/get-dishes.use-case';
import { UpdateDishUseCase } from './usecase/update-dish.use-case';
import { CreateDishUseCase } from './usecase/create-dish.use-case';
import { DeleteDishUseCase } from './usecase/delete-dish.use-case';
import { UserDishesController } from './userDishes.controller';
import { SelectDishUseCase } from './usecase/select-dish.use-case';
import { UnSelectDishUseCase } from './usecase/unselect-dish.use-case';

@Module({
  imports: [HttpModule],
  controllers: [DishesController, UserDishesController],
  providers: [
    GetDishUseCase,
    GetDishesUseCase,
    UpdateDishUseCase,
    CreateDishUseCase,
    DeleteDishUseCase,
    SelectDishUseCase,
    UnSelectDishUseCase,
  ],
})
export class DishesModule {}
