import { UserDbEntity } from '../persistence/user.entity';

export interface User {
  id: string;
  name: string;
  image?: string;
  email: string;
  password: string;
}

export const mapUserFromDbEntity = (userDbEntity: UserDbEntity): User => ({
  id: userDbEntity.id,
  name: userDbEntity.name,
  image: userDbEntity.image,
  email: userDbEntity.email,
  password: userDbEntity.password,
});
