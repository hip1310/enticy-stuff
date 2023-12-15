// Import necessary modules from TypeORM
import { Entity, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Define an Entity using the @Entity decorator
@Entity()
export class BaseEntity {
  // Define a primary generated column for the 'id' field
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  // Define an 'updated_at' column with the current timestamp by default and updated on each update
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
