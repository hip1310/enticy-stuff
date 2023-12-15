// Import necessary decorators and classes from TypeORM
import { Entity, Column } from "typeorm";
import { BaseEntity } from "../base-entity";

// Define the Order entity, extending the BaseEntity
@Entity()
export class Order extends BaseEntity {
  // Define a column for the name of the order
  @Column()
  name!: string;

  // Define a column for the image associated with the order
  @Column()
  image!: string;

  // Define a column for the quantity of the ordered item
  @Column()
  qty!: number;

  // Define a column for the price of the ordered item
  @Column()
  price!: string;

  // Define a column for the category of the ordered item
  @Column()
  category!: string;

  // Define a column for the status of the order
  @Column()
  status!: string;

  // Define a column for the address ID associated with the order
  @Column({ name: "address" })
  address!: string;

  // Define a column for the user ID associated with the order
  @Column({ name: "user_id" })
  userId!: number;

  // Define a column for the warehouse ID associated with the order
  @Column({ name: "warehouse_id" })
  warehouseId!: number;
}
