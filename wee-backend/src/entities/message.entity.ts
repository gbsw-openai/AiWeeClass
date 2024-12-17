import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';

@Entity('Message')
export class MessageEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  userMessage: string;

  @Column('text', { nullable: false })
  aiResponse: string;

  @Column('int', { unique: false, nullable: false })
  userId: number;

  @Column('int', { unique: false, nullable: false })
  roomId: number;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  room: RoomEntity;
}
