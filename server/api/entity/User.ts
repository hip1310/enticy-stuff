import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  email_verified!: boolean;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  picture!: string;

  @Column()
  sub!: string;

  @Column()
  updated_at!: Date;
}
