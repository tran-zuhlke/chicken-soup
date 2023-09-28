import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const DISHES_TABLE_NAME = 'dishes';

@Entity(DISHES_TABLE_NAME)
export class DishDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column({ name: 'created_at' })
  createdAt: string;
}
