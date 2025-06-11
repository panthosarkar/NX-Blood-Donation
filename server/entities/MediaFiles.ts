import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { getTimestamp } from "../utils/time";

@Entity({ name: "MediaFiles" })
export class MediaFiles {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int" })
  userId: number = 0;

  @Column({ type: "character varying", length: 200 })
  fileName: string = "";

  @Column({ type: "character varying", length: 200, default: "" })
  fileMimeTypes: string = "";

  @Column({ type: "int" })
  fileSize: number = 0;

  @Column({ type: "character varying", length: 10 })
  fileExtension: string = "";

  @Column({ type: "character varying", length: 500 })
  fileUrl: string = "";

  @Column({ type: "boolean" })
  isPublic: boolean = false;

  @Column({ type: "text", default: "" })
  fileUploadData: string = "";

  @Column({ type: "character varying", length: 64, default: "" })
  fileHash: string = "";

  @Column({ type: "character varying", length: 20 })
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
