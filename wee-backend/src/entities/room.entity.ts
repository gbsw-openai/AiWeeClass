import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonBigPKEntity } from "./common.entity";
import { UserEntity } from "./user.entity";

@Entity('Room')
export class RoomEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false})
  name: string;

  @OneToOne(() => UserEntity, (user) => user.rooms)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  user: UserEntity;
}