import { getTimestamp } from "@/server/utils/time";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "AdsSlotMedia" })
export class AdsSlotMedia {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int" })
  userId: number = 0;

  @Column({ type: "int" })
  websiteId: number = 0;

  @Column({ type: "int" })
  adsSlotId: number = 0;

  @Column({ type: "int", default: 5 })
  delay: number = 10;

  @Column({
    type: "character varying",
    length: 50,
    enum: ["image", "text", "youtube"],
  })
  mediaType: string = "";

  @Column({ type: "character varying", length: 500 })
  mediaUrl: string = "";

  @Column({ type: "character varying", length: 20 })
  size: string = "";

  @Column({ type: "character varying", length: 500 })
  targetUrl: string = "";

  @Column({ type: "int", default: 0 })
  position: number = 0;

  @Column({
    type: "character varying",
    length: 20,
    enum: ["active", "inactive"],
  })
  status: string = "active";

  @Column({ type: "text" })
  note: string = "";

  @Column({
    type: "integer",
    default: 0,
  })
  creator: number = 0;

  @Column({ type: "character varying", length: 50 })
  ip: string = "";

  @Column({
    type: "integer",
    default: 0,
  })
  timeCreated: number = getTimestamp();

  @Column({
    type: "integer",
    default: 0,
  })
  timeUpdated: number = getTimestamp();

  @Column({
    type: "integer",
    default: 0,
  })
  timeDeleted: number = 0;
}
