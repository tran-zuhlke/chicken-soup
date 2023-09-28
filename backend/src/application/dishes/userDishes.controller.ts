import { Controller, Delete, Logger, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SelectDishUseCase } from './usecase/select-dish.use-case';
import { UserDish } from '../../domain/UserDish';
import { UnSelectDishUseCase } from './usecase/unselect-dish.use-case';

@ApiTags('User Dishes')
@Controller('userDishes')
export class UserDishesController {
  private readonly logger = new Logger(UserDishesController.name);

  constructor(private selectDishUseCase: SelectDishUseCase, private unSelectDishUseCase: UnSelectDishUseCase) {}

  @Post()
  async selectDish(@Query('userId') userId: string, @Query('dishId') dishId: string): Promise<UserDish> {
    this.logger.log(`Selecting dish ${dishId} for user ${userId}`);
    return await this.selectDishUseCase.invoke(userId, dishId);
  }

  @Delete(':id')
  async unselectDish(@Param('id') userDishId: string): Promise<UserDish> {
    this.logger.log(`Deleting user dish ${userDishId}`);
    return await this.unSelectDishUseCase.invoke(userDishId);
  }
}
