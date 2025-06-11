import { getTimestamp } from "@/server/utils/time";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "DocsPage" })
export class DocsPage {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "integer" })
  parentId: number = 0;

  @Column({ type: "character varying", length: 50 })
  appKey: string = "";

  @Column({ type: "character varying", length: 50 })
  permalink: string = "";

  @Column({ type: "character varying", length: 255 })
  title: string = "";

  @Column({ type: "character varying", length: 500 })
  description: string = "";

  @Column({ type: "integer" })
  priority: number = 0;

  @Column({ type: "character varying", length: 500 })
  note: string = "";

  @Column({ type: "boolean" })
  isContent: boolean = false;

  @Column({ type: "boolean" })
  isPublic: boolean = false;

  @Column({
    type: "character varying",
    length: 20,
    enum: ["active", "inactive", "deleted"],
  })
  status: string = "active";

  @Column({ type: "integer" })
  creator: number = 0;

  @Column({ type: "character varying", length: 50 })
  ip: string = "";

  @Column({ type: "integer" })
  timeCreated: number = getTimestamp();

  @Column({ type: "integer" })
  timeUpdated: number = getTimestamp();

  @Column({ type: "integer" })
  timeDeleted: number = 0;
}
