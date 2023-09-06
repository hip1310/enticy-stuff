import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cart {
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
  user_id!: number;

  @Column()
  updated_at!: Date;
}
