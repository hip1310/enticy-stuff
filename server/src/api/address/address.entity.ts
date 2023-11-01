// Import necessary modules from TypeORM
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "../user/user.entity";
// Import the base entity class for inheritance
import { BaseEntity } from "../base-entity";

// Define the Address entity class, extending the BaseEntity
@Entity()
export class Address extends BaseEntity {
  // Define a column for the name of the Address
  @Column()
  name!: string;

  // Define a column for the mobile of the Address
  @Column()
  mobile!: string;

  // Define a column for the address_line1 of the Address
  @Column()
  address_line1!: string;

  // Define a column for the address_line2 of the Address
  @Column()
  address_line2!: string;

  // Define a column for the landmark of the Address
  @Column()
  landmark!: string;

  // Define a column for the pincode of the Address
  @Column()
  pincode!: string;

  // Define a column for the default_address of the Address
  @Column()
  default_address!: boolean;

  // Define a column for the user ID associated with the Address, with a custom column name
  @JoinColumn({ name: "user_id" })
  @OneToOne(() => User,{onDelete: "NO ACTION"})
  user!: User;
}
