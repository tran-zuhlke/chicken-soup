import { Injectable } from '@nestjs/common';
import prisma from '../../../lib/prisma';
import { UserDbEntity } from '../../persistence/user.entity';

@Injectable()
export class UsersService {
  async findOne(mail: string): Promise<UserDbEntity> {
    const user = await prisma.user.findFirst({
      where: {
        email: mail,
      },
    });
    return user;
  }
}
