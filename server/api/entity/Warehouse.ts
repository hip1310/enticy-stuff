import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column()
  address!: string;

  @Column()
  updated_at!: Date;
}
