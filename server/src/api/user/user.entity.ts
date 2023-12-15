// Importing necessary modules from TypeORM
import { Entity, Column } from "typeorm";
// Importing the BaseEntity class from the specified path
import { BaseEntity } from "../base-entity";

// Declaring a new entity class named User, extending the BaseEntity class
@Entity()
export class User extends BaseEntity {
  constructor(id: number) {
    super();
    this.id = id;
  }
  
  // Column decorator indicating a database column with the name "email" and type string
  @Column()
  email!: string;

  // Column decorator indicating a database column with the name "email_verified" and type boolean
  @Column({ name: "email_verified" })
  email_verified!: boolean;

  // Column decorator indicating a database column with the name "name" and type string
  @Column()
  name!: string;

  // Column decorator indicating a database column with the name "nickname" and type string
  @Column()
  nickname!: string;

  // Column decorator indicating a database column with the name "picture" and type string
  @Column()
  picture!: string;

  // Column decorator indicating a database column with the name "sub" and type string
  @Column()
  sub!: string;
}
