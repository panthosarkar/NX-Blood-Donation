import { getTimestamp } from "@/server/utils/time";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "DocsContent" })
export class DocsContent {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "integer" })
  applicationId: number = 0;

  @Column({ type: "integer" })
  menuId: number = 0;

  @Column({ type: "integer" })
  parentId: number = 0;

  @Column({ type: "character varying", length: 20 })
  appKey: string = "";

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "character varying", length: 500 })
  note: string = "";

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
