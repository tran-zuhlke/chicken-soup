import { Injectable, Logger } from '@nestjs/common';
import prisma from '../../../../lib/prisma';
import * as moment from 'moment';
import { mapUserDishFromDbEntity, UserDish } from '../../../domain/UserDish';

@Injectable()
export class SelectDishUseCase {
  private readonly logger = new Logger(SelectDishUseCase.name);

  async invoke(userId: string, dishId: string): Promise<UserDish> {
    this.logger.debug(`Invoked ${SelectDishUseCase.name} for dishId ${dishId} and userId ${userId}`);

    let userDishToday = await prisma.userDish.findFirst({
      where: {
        userId: userId,
        dishId: dishId,
        createdAt: {
          gte: moment(new Date()).startOf('day').toDate(),
        },
      },
    });

    if (!userDishToday) {
      userDishToday = await prisma.userDish.create({
        data: {
          user: { connect: { id: userId } },
          dish: { connect: { id: dishId } },
          createdAt: new Date(),
        },
      });
    }

    return mapUserDishFromDbEntity(userDishToday);
  }
}
