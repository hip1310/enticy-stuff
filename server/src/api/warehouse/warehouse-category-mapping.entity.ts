// Import necessary modules from TypeORM
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

// Import the Warehouse entity
import { Warehouse } from "./warehouse.entity";

// Import the BaseEntity for common properties
import { BaseEntity } from "../base-entity";

// Define the entity for the WarehouseCategoryMapping table
@Entity("warehouse-category-mapping")
export class WarehouseCategoryMapping extends BaseEntity {
  // Define a column for the category
  @Column()
  category!: string;

  // Establish a one-to-one relationship with the Warehouse entity
  @OneToOne(() => Warehouse, { eager: true }) // Use eager loading for the relationship
  @JoinColumn({ name: "warehouse_id" }) // Define the foreign key column name
  warehouse!: Warehouse; // Reference to the related Warehouse entity
}
