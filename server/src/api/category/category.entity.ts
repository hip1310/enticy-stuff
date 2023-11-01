import { Entity, Column } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column({ name: "contentful_id" })
  contentfulId!: string;
}
