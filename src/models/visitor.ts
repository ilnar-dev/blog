import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Visitor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ip!: string;

  @Column()
  insertedAt!: Date;
}
