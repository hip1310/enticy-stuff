import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  qty!: number;

  @Column()
  price!: string;

  @Column()
  category!: string;

  @Column()
  status!: string;

  @Column()
  user_id!: number;

  @Column()
  warehouse_id!: number;

  @Column()
  updated_at!: Date;
}
