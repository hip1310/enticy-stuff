import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  cost!: number;

  @Column()
  description!: string;

  @Column()
  thumbnail!: string;

  @Column()
  image!: string;
}
