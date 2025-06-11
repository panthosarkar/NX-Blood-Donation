import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { getTimestamp } from "../../utils/time";

@Entity({ name: "DomainPricing" })
export class DomainPricing {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", length: 20 })
  tld: string = "";

  @Column({ type: "double precision" })
  registerFee: number = 0;

  @Column({ type: "double precision" })
  renewFee: number = 0;

  @Column({ type: "double precision" })
  transferFee: number = 0;

  @Column({ type: "double precision" })
  registerDiscountRate: number = 0;

  @Column({ type: "double precision" })
  transferDiscountRate: number = 0;

  @Column({ type: "int" })
  registerDiscountDuration: number = 0;

  @Column({ type: "int" })
  transferDiscountDuration: number = 0;

  @Column({
    type: "character varying",
    length: 50,
    enum: ["active", "inactive"],
    default: "active",
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
