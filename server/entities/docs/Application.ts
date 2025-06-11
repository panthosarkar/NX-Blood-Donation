import { getTimestamp } from "@/server/utils/time";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Application" })
export class Application {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "character varying", length: 255 })
  title: string = "";

  @Column({ type: "character varying", length: 255 })
  uniqueName: string = "";

  @Column({ type: "character varying", length: 1000 })
  description: string = "";

  @Column({ type: "text" })
  websiteUrl: string = "";

  @Column({ type: "text" })
  logoUrl: string = "";

  @Column({ type: "int" })
  priority: number = 0;

  @Column({ type: "character varying", length: 500 })
  note: string = "";

  @Column({
    type: "character varying",
    length: 20,
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
