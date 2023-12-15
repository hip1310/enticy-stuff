// Import necessary modules from TypeORM
import { Entity, Column } from "typeorm";

// Import the BaseEntity class for inheritance
import { BaseEntity } from "../base-entity";

// Define Warehouse entity, extending BaseEntity
@Entity()
export class Warehouse extends BaseEntity {

  // Define a column for the name of the warehouse
  @Column()
  name!: string;

  // Define a column for the code of the warehouse
  @Column()
  code!: string;

  // Define a column for the address of the warehouse
  @Column()
  address!: string;
}
