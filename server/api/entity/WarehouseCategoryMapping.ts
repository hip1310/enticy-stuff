import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Warehouse } from "./Warehouse";

@Entity("warehouse-category-mapping")
export class WarehouseCategoryMapping {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  @OneToOne(() => Warehouse, { eager: true })
  @JoinColumn({ name: "warehouse_id" })
  warehouse!: Warehouse;

  @Column()
  updated_at!: Date;
}
