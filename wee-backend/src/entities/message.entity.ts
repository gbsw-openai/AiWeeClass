import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';

@Entity('Message')
export class MessageEntity extends BaseEntity{
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
    
  @Column('varchar', { unique: false, nullable: false })
  userMessage: string;

  @Column('text', { nullable: false })
  aiResponse: string;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false
  })
  userId: number;
  
  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({ name: 'user_id'})
  user: UserEntity;

  @Column({
    name: 'room_id',
    type: 'integer',
    nullable: false
  })
  roomId: number;

  @ManyToOne(() => RoomEntity, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id'})
  room: RoomEntity;
}
