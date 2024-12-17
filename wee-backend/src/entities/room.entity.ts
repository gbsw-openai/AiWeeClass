import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { CommonBigPKEntity } from "./common.entity";
import { UserEntity } from "./user.entity";
import { MessageEntity } from "./message.entity";

@Entity('Room')
export class RoomEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false})
  name: string;

  @Column('int', { unique: false, nullable: false })
  userId: number;

  @Column('int', { unique: false, nullable: false})
  roomId: number;

  @OneToMany(() => UserEntity, (user) => user.rooms)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.room, { onDelete: 'CASCADE' })  // onDelete: 'CASCADE' 추가
  messages: MessageEntity[];
}