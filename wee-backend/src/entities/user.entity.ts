import { Column, Entity,  OneToMany, OneToOne} from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { MessageEntity } from './message.entity';
import { RoomEntity} from './room.entity';

@Entity('User')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false})
  password: string;

  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToOne(() => RoomEntity, (room) => room.user)
  rooms: RoomEntity[];
}
