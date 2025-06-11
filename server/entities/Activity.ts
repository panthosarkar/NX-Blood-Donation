import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { getTimestamp } from "../utils/time";

@Entity({ name: "Activity" })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "character varying", length: 50 })
  appKey: string = "";

  @Column({ type: "character varying", length: 50 })
  activityKey: string = "";

  @Column({ type: "character varying", length: 1000 })
  description: string = "";

  @Column({ type: "text" })
  currentValues: string = "";

  @Column({ type: "text" })
  newValues: string = "";

  @Column({ type: "character varying", length: 50 })
  weight: string = "";

  @Column({
    type: "character varying",
    length: 50,
    enum: ["active", "inactive", "deleted"],
  })
  status: string = "";

  @Column()
  creator: number = 0;

  @Column({ type: "character varying", length: 50 })
  ip: string = "";

  @Column()
  timeCreated: number = getTimestamp();

  @Column()
  timeUpdated: number = getTimestamp();

  @Column()
  timeDeleted: number = 0;
}
