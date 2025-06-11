import { getTimestamp } from "@/server/utils/time";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "AdsSlot" })
export class AdsSlot {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int" })
  userId: number = 0;

  @Column({ type: "int" })
  websiteId: number = 0;

  @Column({ type: "character varying", length: 200 })
  slotName: string = "";

  @Column({ type: "int", default: 5 })
  delay: number = 10;

  @Column({
    type: "character varying",
    length: 50,
    enum: ["image", "text", "youtube", "mixed"],
  })
  mediaType: string = "";

  @Column({ type: "character varying", length: 500 })
  primaryImage: string = "";

  @Column({ type: "character varying", length: 20 })
  recommendedSize: string = "";

  @Column({ type: "character varying", length: 1000 })
  targetUrl: string = "";

  @Column({ type: "text" })
  note: string = "";

  @Column({
    type: "character varying",
    length: 20,
    enum: ["active", "inactive"],
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
