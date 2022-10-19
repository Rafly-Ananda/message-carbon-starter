import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BusinessLabel {
  @PrimaryGeneratedColumn()
  uniqid: number;
}
