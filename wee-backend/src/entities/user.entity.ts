import { BaseEntity, Column, Entity,  OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { MessageEntity } from './message.entity';
import { RoomEntity} from './room.entity';

@Entity('User')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { unique: false, nullable: false})
  password: string;

  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToMany(() => RoomEntity, (room) => room.user)
  rooms: RoomEntity[];
  
}
