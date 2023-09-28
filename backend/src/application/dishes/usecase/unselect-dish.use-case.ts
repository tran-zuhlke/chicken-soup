import { Injectable, Logger } from '@nestjs/common';
import prisma from '../../../../lib/prisma';
import { mapUserDishFromDbEntity, UserDish } from '../../../domain/UserDish';

@Injectable()
export class UnSelectDishUseCase {
  private readonly logger = new Logger(UnSelectDishUseCase.name);

  async invoke(userDishId: string): Promise<UserDish> {
    this.logger.debug(`Invoked ${UnSelectDishUseCase.name} for userDishId ${userDishId}`);

    const userDishToday = await prisma.userDish.delete({
      where: {
        id: userDishId,
      },
    });

    return mapUserDishFromDbEntity(userDishToday);
  }
}
