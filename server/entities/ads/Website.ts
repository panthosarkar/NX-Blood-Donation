import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { getTimestamp } from "../../utils/time";

@Entity({ name: "Website" })
export class Website {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int" })
  userId: number = 0;

  @Column({ type: "character varying", length: 50 })
  website: string = "";

  @Column({ type: "character varying", length: 200 })
  notes: string = "";

  @Column({ type: "character varying", length: 500 })
  logoUrl: string = "";

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
