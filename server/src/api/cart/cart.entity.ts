// Import necessary modules from TypeORM
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "../user/user.entity";
// Import the base entity class for inheritance
import { BaseEntity } from "../base-entity";

// Define the Cart entity class, extending the BaseEntity
@Entity()
export class Cart extends BaseEntity {
  // Define a column for the name of the cart item
  @Column()
  name!: string;

  // Define a column for the image URL of the cart item
  @Column()
  image!: string;

  // Define a column for the quantity of the cart item
  @Column()
  qty!: number;

  // Define a column for the price of the cart item
  @Column()
  price!: string;

  // Define a column for the category of the cart item
  @Column()
  category!: string;

  // Define a column for the user ID associated with the cart item, with a custom column name
  @JoinColumn({ name: "user_id" })
  @OneToOne(() => User)
  user!: User;
}
